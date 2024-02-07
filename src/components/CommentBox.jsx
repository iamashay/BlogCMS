'use client'
import { formatDate } from "@/lib/PostFunctions"
import toast, { Toaster } from "react-hot-toast"
import { Suspense, useState, useMemo, useRef } from "react"
import { CommentSkeleton } from "./LoadingSkeleton/CommentSkeleton"

async function getComments(slug) {
    //await new Promise((resolve, rejec) => setInterval(() => resolve(2), 9000))
    // await new Promise(r => setTimeout(r, 300));
    try {
        const commentData = await fetch(process.env.NEXT_PUBLIC_API_URL+'/comment?slug='+slug, {cache: "no-cache"})
        const commentDataJSON = await commentData.json()
        return commentDataJSON
    } catch (e) {
        console.log(e)
        throw Error("Error getting comments")
    }

}

async function CommentList({slug, commentData}) {
    const [totalComments, data] =  await useMemo( async () =>  getComments(slug), [slug])

    if (commentData.current.length === 0 && totalComments != 0) commentData.current = data
    return (
        <section>
            {
                commentData?.current?.length > 0 && 
                commentData?.current?.map((comment)=> {
                    return (
                    <article key={comment.id} className="bg-gray-200 my-2 p-2">
                        <header className="text-sm"><b>{comment.guestName}</b> commented on <time>{formatDate(comment.createdAt)}</time></header>
                        <p className="p-1">{comment.body}</p>
                    </article>
                    )
                })
            }
        </section>
    ) 
}

const saveComment = async (event, commentData, setLoading, setForceRender) => {
    event.preventDefault();
    setLoading(true)
    const saveLoadMsg = toast.loading("Adding comment...")
    try {
        const formElm = event.target
        const form = new FormData(formElm)
        const formData = Object.fromEntries(form)
        const res = await fetch('/api/comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const resBody = await res.json()
        if (res.ok) {
            toast.success("Comment added!")
            commentData.current = [resBody, ...commentData.current]
            setForceRender((force) => !force)
            formElm.reset()
            return 
        }
        console.log(resBody, res)
        toast.error(resBody.error)
    } catch (e){
        toast.error("Some error occured!")
        console.error(e)
    } finally {
        toast.dismiss(saveLoadMsg)
        setLoading(false)
    }

}

function CommentForm({slug, commentData, setForceRender}) {

    const [loading, setLoading] = useState(false)

    

    return (
    <form className="flex flex-col" onSubmit={(e) => saveComment(e, commentData, setLoading, setForceRender) }>
        <div className="relative z-0 w-fit my-5 group">
            <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-fit mb-5 group">
            <input type="text" name="guestName" id="guestName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="guestName" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>
        <div className="w-full mb-5"> 
            <label htmlFor="body" className="sr-only">Your comment</label> 
            <textarea id="body" name="body" className="resize rounded-md w-full border p-2 border-gray-600 focus:border-blue-600 focus:outline-none focus:ring-1" placeholder="Enter your comment"></textarea>
        </div>
        <input type="hidden" name="slug" id="slug" value={slug} required />
        <button type="submit" disabled={loading} className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
    </form>
    )
}

let i = 0, j = 0

export default function Comment({slug}) {
    const commentData = useRef([])
    const [force, setForceRender] = useState(false)
    return (
        <section>
            <Toaster></Toaster>
            <h3 className="text-lg font-semibold">Comments:</h3>
            <CommentForm slug={slug} commentData={commentData} setForceRender={setForceRender}  />
            <Suspense fallback={<CommentSkeleton count={2}/>}>
                <CommentList slug={slug} commentData={commentData} setForceRender={setForceRender} />
            </Suspense>
        </section>
    )
}