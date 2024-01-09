import { PostForm } from "@/components/Post/PostForm";
import { PrismaClient } from "@prisma/client";
import { Toaster } from "react-hot-toast";
import { getPostDataById } from "@/lib/PostFunctions";
const prisma = new PrismaClient()



export default async function EditPost({params}) {
    const postId = params.id
    const postData = await getPostDataById(postId)
    return (
        <main className='flex flex-col justify-center m-5'>
            <h1>Edit Post</h1>
            <div className=''>
                <PostForm postData={postData}></PostForm>
            </div>
            <Toaster/>
        </main>
    )
}