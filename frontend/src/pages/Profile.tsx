import App from "@/App";
import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { ProfileTab } from "@/components/Profile-tab";




export function Profile(){
    return<>
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <main className="flex-grow flex justify-center items-start mt-40">
        <ProfileTab />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
    </>

}