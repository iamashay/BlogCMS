import { PrismaClient } from "@prisma/client";
import { getPostDataById } from "@/lib/PostFunctions";
import { authorizeUser } from "@/lib/Authorize";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { CommentForm } from "@/components/Dashboard/Comment/CommentForm";
import { getCommentDataById } from "@/lib/CommentFunctions";
const prisma = new PrismaClient()

export const metadata = {
    title: `Edit Comment`, 
  }

export default async function EditComment({params}) {
    const commentId = params.id
    const commentData = await getCommentDataById(commentId)
    console.log(commentData)
    if (!await authorizeUser({username: commentData?.author?.username, role: ['User', 'Admin'], compareRole:true, compareUser: true})) redirect('/dashboard/post/new')
    return (
        <main className='flex flex-col justify-center m-5'>
            <h1 className="dashboard-head">Edit Comment</h1>
            <div className=''>
                <CommentForm commentData={commentData}></CommentForm>
            </div>
        </main>
    )
}