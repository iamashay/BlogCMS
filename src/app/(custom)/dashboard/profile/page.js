import { auth } from "@/auth";
import { ProfileForm } from "@/components/Dashboard/User/ProfileForm";
import { getUserDataById } from "@/lib/UserFunctions";
import { Toaster } from "react-hot-toast";

export const metadata = {
    title: `Edit Profile`, 
  }

export default async function EditProfile() {
    const session = await auth()
    const getUserData = await getUserDataById(session?.user?.id)
    return (
        <main className='flex flex-col justify-center my-5 mx-5'>
            <h1 className="dashboard-head">Edit Profile</h1>
            <div className=''>
                <ProfileForm create={true} userData={getUserData}></ProfileForm>
            </div>
            <Toaster/>
        </main>
    )
}