import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";
import ChatPage from "./ChatPage";
import { MessageSquare } from "lucide-react";

export function Chat() {
  const { user, login } = useAuthStore();
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <MessageSquare className="size-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Messages</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">Please log in to chat with other students.</p>
        <Button size="lg" className="px-8 rounded-full shadow-sm" onClick={login}>Login to Continue</Button>
      </div>
    );
  }
  
  return (
    <div className="font-sans container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6 border-b border-border/50 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Chat with buyers and sellers on campus.</p>
      </div>
      <div className="h-[75vh]">
        <ChatPage />
      </div>
    </div>
  );
}
