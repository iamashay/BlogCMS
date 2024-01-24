import PostListTable from "@/components/Dashboard/PostListTable"
import { getPostsByUser, getAllPosts } from "@/lib/PostFunctions"
import { PopUp } from "@/components/Reusables/PopUp"
import { authorizeUser } from "@/lib/Authorize"
import { redirect } from "next/navigation"
import CommentListTable from "@/components/Dashboard/CommentListTabel"
import { getAllComments } from "@/lib/CommentFunctions"

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


export default async function ViewComment({searchParams}) {
    if (!await authorizeUser()) redirect('/')
    const defaultData = await getAllComments()
    //console.log(defaultData)
    return (
        <main className='m-5'>
            <h1 className="dashboard-head">All Posts</h1>
            <CommentListTable defaultData={defaultData}></CommentListTable>
        </main>
    )
}