import { Label } from "@radix-ui/react-dropdown-menu"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { useAuthStore } from "../store/useAuthStore"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"

export function MyProfile(){
    const{user, login, logout} = useAuthStore()
    if (!user) {
     return (
    <Card className="sm:mx-32 font-sans text-center  items-center">
      <div>Please log in to view your profile.</div>
      <Button className="w-fit cursor-pointer" onClick={login}>Login</Button>
    </Card>
  );
}
    return<>
    <Card className="p-5 mx-5 sm:mx-32 font-sans">
        <div className="w-full flex justify-center">
            <Avatar className="size-30">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
        </div>
        <div className="flex justify-between">
        <div className="gap-5 ">
          <Label className="px-1 text-lg py-1">
            Display Name
          </Label>
          <Input
            type="text"
            disabled
            className="hover:cursor-not-allowed h-20 md:text-2xl w-fit text-center"
            placeholder="User Name"
            value={user?.username}
          ></Input>
        </div>
        <div className="gap-5 ">
          <Label className="px-1 text-lg py-1">
            Email
          </Label>
          <Input
            type="text"
            disabled
            className="hover:cursor-not-allowed h-20 md:text-2xl text-center w-lg"
            placeholder="Email"
            value={user?.email}
          ></Input>
        </div>
        <div className="gap-5 ">
          <Label className="px-1 text-lg py-1">
            Hostel Number
          </Label>
          <Input
            type="text"
            className="h-20 md:text-2xl w-fit text-center"
            placeholder="Hostel-9"
            value="9"
          ></Input>
        </div>
        </div>
        <div className="">
          <Label className="px-1 text-sm py-1">
            About Me
          </Label>
          <Textarea
            className="sm:min-h-20"
            placeholder="Write About Your Self"
            //onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </div>
        <div className="flex justify-end gap-5">
            <Button>Save Changes</Button>
            <AlertDialog>
            <AlertDialogTrigger asChild>
  <Button variant="destructive" className="cursor-pointer">
    Logout
  </Button>
</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to logout?
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer" onClick={logout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
    </Card>
    </>
}