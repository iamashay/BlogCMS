import { PostForm } from "@/components/Post/PostForm";
import { Toaster } from "react-hot-toast";

export default function NewPost() {
    return (
        <main className='flex flex-col justify-center my-5 mx-5'>
            <h1 className="dashboard-head">New Post</h1>
            <div className=''>
                <PostForm create={true}></PostForm>
            </div>
            <Toaster/>
        </main>
    )
}