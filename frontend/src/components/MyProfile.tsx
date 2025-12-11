import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAuthStore } from "../store/useAuthStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Spinner } from "./ui/spinner";
import { useState, useRef } from "react";
import { toast } from "sonner";

export function MyProfile() {
  const { user, login, logout, updateProfile } = useAuthStore();
  const [description, setDescription] = useState<string | null | undefined>(user?.description ?? "");
  const [hostelNo, setHostelNo] = useState<string | null | undefined>(user?.hostelNo ?? "");
  const [profilePhoto, setProfilePhoto] = useState<string | null | undefined>(user?.profilePhoto ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  if (!user) {
    return (
      <Card className="sm:mx-32 font-sans text-center  items-center">
        <div>Please log in to view your profile.</div>
        <Button className="w-fit cursor-pointer" onClick={login}>
          Login
        </Button>
      </Card>
    );
  }
  return (
    <>
      <Card className="p-5 mx-5 sm:mx-32 font-sans">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <Avatar className="size-30">
            <AvatarImage src={profilePhoto ?? undefined} alt="" />
            <AvatarFallback>
              <Spinner />
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                if (f) {
                  setFile(f);
                  setProfilePhoto(URL.createObjectURL(f));
                }
              }}
              className="hidden"
            />
            <Button
              size={"sm"}
              className="cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              Change Avatar
            </Button>
            {file && (
              <Button
                size={"sm"}
                variant="ghost"
                onClick={() => {
                  setFile(null);
                  setProfilePhoto(user?.profilePhoto ?? "");
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between flex-col md:flex-row">
          <div className="gap-5 ">
            <Label className="px-1 text-lg py-1">Display Name</Label>
            <Input
              type="text"
              disabled
              className="hover:cursor-not-allowed h-20 md:text-2xl w-fit text-center"
              placeholder="User Name"
              value={user?.username}
            ></Input>
          </div>
          <div className="gap-5 ">
            <Label className="px-1 text-lg py-1">Email</Label>
            <Input
              type="text"
              disabled
              className="hover:cursor-not-allowed h-20 md:text-2xl text-center md:w-lg"
              placeholder="Email"
              value={user?.email}
            ></Input>
          </div>
          <div className="gap-5 ">
            <Label className="px-1 text-lg py-1">Hostel Number</Label>
            <Input
              type="text"
              className="h-20 md:text-2xl w-fit text-center"
              placeholder="Enter Your Hostel No"
              value={hostelNo ?? ""}
              onChange={(e) => setHostelNo(e.target.value)}
            ></Input>
          </div>
        </div>
        <div className="">
          <Label className="px-1 text-sm py-1">About Me</Label>
          <Textarea
            className="sm:min-h-20"
            placeholder="Write About Your Self"
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </div>
        <div className="flex justify-end gap-5">
          <Button
            onClick={async () => {
              if (!user) return;
              setSaving(true);
              try {
                await updateProfile({ hostelNo: hostelNo ?? null, description: description ?? null, file });
              } catch (err) {
                console.error(err);
                toast.error("Failed to save");
              } finally {
                setSaving(false);
              }
            }}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
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
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer" onClick={logout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </>
  );
}
