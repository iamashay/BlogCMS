import { PostForm } from "@/components/Post/PostForm";
import { PrismaClient } from "@prisma/client";
import { Toaster } from "react-hot-toast";
import { cache } from 'react'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

const getPostData =  cache( async (id) => {
        const postData = await prisma.post.findUnique({
            where: { id }
        })
        // console.log(postData, id)
        if (!postData) redirect('/dashboard/post/new')
        return postData
})

export default async function EditPost({params}) {
    const postId = params.id
    const postData = await getPostData(postId)
    return (
        <main className='flex flex-col justify-center my-5 mx-5'>
            <h1>Edit Post</h1>
            <div className=''>
                <PostForm postData={postData}></PostForm>
            </div>
            <Toaster/>
        </main>
    )
}