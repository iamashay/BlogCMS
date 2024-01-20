import { PostForm } from "@/components/Post/PostForm";
import { PrismaClient } from "@prisma/client";
import { Toaster } from "react-hot-toast";
import { getPostDataById } from "@/lib/PostFunctions";
import { authorizeUser } from "@/lib/Authorize";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
const prisma = new PrismaClient()



export default async function EditPost({params}) {
    const postId = params.id
    const postData = await getPostDataById(postId)
    if (!await authorizeUser({username: postData?.author?.username, compareUser: true})) redirect('/dashboard/post/new')
    return (
        <main className='flex flex-col justify-center m-5'>
            <h1 className="dashboard-head">Edit Post</h1>
            <div className=''>
                <PostForm postData={postData}></PostForm>
            </div>
            <Toaster/>
        </main>
    )
}