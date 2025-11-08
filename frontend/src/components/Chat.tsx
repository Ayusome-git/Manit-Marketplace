import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import ChatPage from "./ChatPage";

export function Chat() {
  const { user, login } = useAuthStore();
  if (!user) {
    return (
      <Card className="sm:mx-32 font-sans text-center items-center">
        <div>Please log in to view your profile.</div>
        <Button className="w-fit cursor-pointer" onClick={login}>
          Login
        </Button>
      </Card>
    );
  }
  return (
    <>
      <Card className="sm:mx-32 font-sans text-center items-center p-0">
        <ChatPage></ChatPage>
        
      </Card>
    </>
  );
}
