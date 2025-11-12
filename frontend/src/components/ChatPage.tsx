import React, { useEffect, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MessageSquare, Send } from "lucide-react";
import { Spinner } from "./ui/spinner";

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
    console.log(messageInput);
    e.preventDefault();
    if (!messageInput.trim() || !activeChat || !user) return;

    const receiverId =
      activeChat.user1Id === user.userId ? activeChat.user2Id : activeChat.user1Id;

    await sendMessage(activeChat.id, user.userId, receiverId, messageInput.trim());
    setMessageInput("");
  };
  
  return (
    <div className="flex h-[90vh] w-full border rounded-xl shadow-md overflow-hidden p-0 m-0">
      {/* Left: chats list */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" /> Chats
        </h2>

        {loading && (
          <div className="w-full flex items-center justify-center">
            <Spinner className="items-center justify-center" />
          </div>
        )}
        {chats.length === 0 ? (
          !loading && <p className="text-sm ">No chats yet</p>
        ) : (
          chats.map((chat) => {
            const otherUserId =
              chat.user1Id === user?.userId ? chat.user2?.username : chat.user1?.username;
            const preview = chat.messages?.[0]?.content ?? "No messages yet";

            return (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-3 mb-2 cursor-pointer rounded-lg transition-colors text-left ${
                  activeChat?.id === chat.id
                    ? "bg-primary text-white"
                    : "border hover:bg-accent"
                }`}
              >
                <div className="font-semibold text-sm">{otherUserId}</div>
                <div className="text-xs opacity-80 truncate">{preview}</div>
              </div>
            );
          })
        )}
      </div>

      {/* Right: messages */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="border-b p-3 font-semibold text-lg ">
              
              {activeChat.user1Id === user?.userId
                ? activeChat.user2?.username
                : activeChat.user2?.username}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1 ">
                {loading && <div className="w-full flex items-center justify-center"> <Spinner className="items-center justify-center"> </Spinner></div>}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === user?.userId ? "justify-end" : "justify-start"
                  }`}
                >
                    <div className="flex flex-col">
                  <div
                    className={`p-2 rounded-2xl max-w-xs break-words ${
                      msg.senderId === user?.userId
                        ? "bg-primary text-white text-right"
                        : "bg-accent text-white text-left"
                    }`}
                  >
                    {msg.content}
                  </div>
                    <div className={`text-[10px] opacity-60 mt-1 ${
                      msg.senderId === user?.userId
                        ? "text-right"
                        : "text-left"
                    }`} >
                      {new Date(msg.sentAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              className="border-t p-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring focus:ring-primary/30"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
