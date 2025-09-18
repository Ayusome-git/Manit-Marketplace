import { ProfileTab } from "@/components/Profile-tab";




export function Profile(){
    return<>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-start mt-40">
        <ProfileTab />
      </main>
    </div>
    </>

}