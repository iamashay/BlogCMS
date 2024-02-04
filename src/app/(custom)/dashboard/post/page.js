import { auth } from "@/auth"
import PostListTable from "@/components/Dashboard/PostListTable"
import { authorizeUser } from "@/lib/Authorize"
import { getPostsByUser, getAllPosts } from "@/lib/PostFunctions"
import { redirect } from "next/navigation"

export const metadata = {
    title: `View Post`, 
}

export default async function ViewPost() {
    const session = await authorizeUser()
    if (!session) return redirect('/')
    const defaultData = await getPostsByUser(session?.user?.username)

    //console.log(defaultData)
    return (
        <main className='m-5'>
            <h1 className="dashboard-head">Your Posts</h1>
            <PostListTable defaultData={defaultData}></PostListTable>
        </main>
    )
}