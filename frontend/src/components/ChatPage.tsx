import React, { useEffect, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MessageSquare, Send } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatPage: React.FC = () => {
  const {
    chats,
    activeChat,
    messages,
    loading,
    initSocket,
    fetchChats,
    sendMessage,
    setActiveChat,
  } = useChatStore();

  const { user } = useAuthStore();
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (user?.userId) {
      initSocket(user.userId);
      fetchChats(user.userId);
    }
  }, [user?.userId, initSocket, fetchChats]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat || !user) return;

    const receiverId =
      activeChat.user1Id === user.userId ? activeChat.user2Id : activeChat.user1Id;

    await sendMessage(activeChat.id, user.userId, receiverId, messageInput.trim());
    setMessageInput("");
  };
  
  return (
    <div className="flex h-full w-full border border-border/50 rounded-2xl shadow-sm bg-card overflow-hidden">
      {/* Left: chats list */}
      <div className="w-1/3 min-w-[250px] border-r border-border/50 flex flex-col bg-muted/10">
        <div className="p-4 border-b border-border/50 bg-card">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            Recent Conversations
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {loading && (
            <div className="w-full flex items-center justify-center py-10">
              <Spinner className="text-primary" />
            </div>
          )}
          {chats.length === 0 ? (
            !loading && (
              <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
                <MessageSquare className="size-8 opacity-20 mb-2" />
                <p className="text-sm">No conversations yet</p>
              </div>
            )
          ) : (
            <div className="flex flex-col gap-1">
              {chats.map((chat) => {
                const otherUser = chat.user1Id === user?.userId ? chat.user2 : chat.user1;
                const otherUsername = otherUser?.username || "Unknown";
                const preview = chat.messages?.[0]?.content ?? "No messages yet";
                const isActive = activeChat?.id === chat.id;

                return (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all text-left ${
                      isActive
                        ? "bg-primary/10 border-primary/20"
                        : "hover:bg-muted border-transparent"
                    } border`}
                  >
                    <Avatar className="size-10 border border-border/50 shadow-sm">
                      <AvatarImage src={otherUser?.profilePhoto || undefined} />
                      <AvatarFallback className={isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
                        {otherUsername.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className={`font-semibold text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
                        {otherUsername}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{preview}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: messages */}
      <div className="flex-1 flex flex-col bg-card relative">
        {activeChat ? (
          <>
            <div className="border-b border-border/50 p-4 font-semibold text-lg flex items-center gap-3 bg-card z-10">
              <Avatar className="size-9 border border-border/50">
                <AvatarImage src={(activeChat.user1Id === user?.userId ? activeChat.user2?.profilePhoto : activeChat.user1?.profilePhoto) || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {(activeChat.user1Id === user?.userId ? activeChat.user2?.username : activeChat.user1?.username)?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span>
                {activeChat.user1Id === user?.userId
                  ? activeChat.user2?.username
                  : activeChat.user1?.username}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/5">
              {loading && <div className="w-full flex items-center justify-center py-4"><Spinner className="text-primary" /></div>}
              {messages.map((msg) => {
                const isMe = msg.senderId === user?.userId;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className="flex flex-col max-w-[75%]">
                      <div
                        className={`p-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-white border border-border/50 text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className={`text-[10px] text-muted-foreground mt-1.5 ${isMe ? "text-right" : "text-left px-1"}`}>
                        {new Date(msg.sentAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-border/50 p-4 bg-card flex items-center gap-3"
            >
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-muted/30 border border-border/50 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-[15px]"
              />
              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="bg-primary text-primary-foreground size-12 rounded-full flex items-center justify-center hover:bg-primary/90 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center text-muted-foreground/60 bg-muted/5">
            <MessageSquare className="size-16 mb-4 opacity-50" />
            <p className="text-lg font-medium text-muted-foreground">Your Messages</p>
            <p className="text-sm mt-1">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
