import PostListTable from "@/components/Dashboard/PostListTable"
import { getPostsByUser, getAllPosts } from "@/lib/PostFunctions"
import { PopUp } from "@/components/Reusables/PopUp"
import { authorizeUser } from "@/lib/Authorize"
import { redirect } from "next/navigation"
import dynamic from 'next/dynamic'

const CommentListTable = dynamic(() => import('@/components/Dashboard/CommentListTabel'), { ssr: false })

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


export default async function ViewAllComment({searchParams}) {
    if (!await authorizeUser({role: ['Admin'], compareRole: true})) redirect('/')
    const defaultData = await getAllComments()
    //console.log(defaultData)
    return (
        <main className='m-5'>
            <h1 className="dashboard-head">All Comments</h1>
            <CommentListTable defaultData={defaultData}></CommentListTable>
        </main>
    )
}