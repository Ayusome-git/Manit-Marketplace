import { create } from "zustand";
import axiosClient from "../config/axios-config";
import { io, Socket } from "socket.io-client";
import type { User } from "./useAuthStore";

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
  user1?: User;
  user2?: User;
}

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  socket: Socket | null;
  loading: boolean;
  error: string | null;

  initSocket: (userId: string) => void;
  fetchChats: (userId: string) => Promise<void>;
  createChat: (user1Id: string, user2Id: string) => Promise<string | null>;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, senderId: string, receiverId: string, content: string) => Promise<void>;
  setActiveChat: (chat: Chat | null) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChat: null,
  messages: [],
  socket: null,
  loading: false,
  error: null,

  initSocket: (userId) => {
    if (!userId) return;

    const socketUrl = "https://manit-marketplace.onrender.com";

    const socket = io(socketUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      socket.emit("register", userId);
    });

    socket.on("receive_message", (message: Message) => {
      const activeId = get().activeChat?.id;

      if (message.chatId === activeId) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      }

      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === message.chatId
            ? { ...chat, updatedAt: new Date().toISOString(), messages: [message] }
            : chat
        ),
      }));
    });

    socket.on("message_sent", (message: Message) => {
      const activeId = get().activeChat?.id;

      if (message.chatId === activeId) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      }

      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === message.chatId
            ? { ...chat, updatedAt: new Date().toISOString(), messages: [message] }
            : chat
        ),
      }));
    });

    set({ socket });
  },

  fetchChats: async (userId) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosClient.get(`/chat/user/${userId}`);
      set({ chats: res.data as Chat[], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createChat: async (user1Id, user2Id) => {
    try {
      const existingChat = get().chats.find(
        (c) =>
          (c.user1Id === user1Id && c.user2Id === user2Id) ||
          (c.user1Id === user2Id && c.user2Id === user1Id)
      );

      if (existingChat) return existingChat.id;

      const res = await axiosClient.post(`/chat/create`, { user1Id, user2Id });
      const newChat = res.data as Chat;

      set((state) => ({
        chats: [newChat, ...state.chats],
      }));

      return newChat.id;
    } catch (err: any) {
      set({ error: err.message });
      return null;
    }
  },

  fetchMessages: async (chatId) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosClient.get(`/chat/${chatId}/messages`);
      set({ messages: res.data as Message[], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  sendMessage: async (chatId, senderId, receiverId, content) => {
    const socket = get().socket;

    if (!socket) {
      set({ error: "Socket not connected" });
      return;
    }

    socket.emit("send_message", {
      chatId,
      senderId,
      receiverId,
      content,
    });
  },

  setActiveChat: (chat) => {
    set({ activeChat: chat, messages: [] });
    if (chat?.id) get().fetchMessages(chat.id);
  },
}));
