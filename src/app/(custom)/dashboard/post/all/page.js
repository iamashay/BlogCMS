import PostListTable from "@/components/Dashboard/PostListTable"
import { getPostsByUser, getAllPosts } from "@/lib/PostFunctions"
import { PopUp } from "@/components/Reusables/PopUp"
import { authorizeUser } from "@/lib/Authorize"
import { redirect } from "next/navigation"

export const metadata = {
    title: `All Posts`, 
  }

const defaultData = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    }
]



export default async function ViewPost({searchParams}) {
    if (!await authorizeUser({role: ['Admin'], compareRole: true})) redirect('/')
    const defaultData = await getAllPosts()
    //console.log(defaultData)
    return (
        <main className='m-5'>
            <h1 className="dashboard-head">All Posts</h1>
            <PostListTable defaultData={defaultData}></PostListTable>
        </main>
    )
}