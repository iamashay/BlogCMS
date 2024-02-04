'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';


export function SEOPostForm({postData, create}) {
    const router = useRouter()
    const editorRef = useRef(null);
    const [saving, setSaving] = useState(false)
    const submitPost = async (e) => {
        const savingMsg = toast.loading("Saving post metadata...")
        e.preventDefault()
        setSaving(true)
        try {
            const formData = new FormData(e.target)
            const body = editorRef?.current?.getContent()
            const {post_title, post_description} = Object.fromEntries(formData)
            // console.log(title, slug, body)
            const formatData = {
                post_title, 
                post_description,
                id: postData?.id,
                slug: postData?.slug,
            }
            const formMethod = 'PUT'

            const sendData = await fetch('/api/post/meta', {
                method: formMethod,
                body: JSON.stringify(formatData)
            })
            const sendDataJson = await sendData.json()
            toast.dismiss(savingMsg)
            if (!sendData.ok) {
                toast.error(sendDataJson?.error)
            } else {
                toast.success("Saved metadata!")
            }
            
        } catch(e){
            toast.error("Error saving the post meta")
        } finally {
            toast.dismiss(savingMsg)
            setSaving(false)
        }
        
    }

    return (
                <form onSubmit={submitPost} method="post" className='flex flex-col gap-4 border border-gray-200 shadow-sm rounded-sm p-4'>
                    <div className='flex gap-1 flex-col '>
                        <label htmlFor="post_title">Meta Title:</label><input className='flex-grow border border-gray-300 my-1 p-1 w-full shadow-sm text-sm' type="text" id="post_title" name="post_title" defaultValue={postData?.postMeta?.post_title || postData?.title}></input>
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <label htmlFor="post_description">Meta Description:</label><textarea className='flex-grow border border-gray-300 my-1    p-1 w-full shadow-sm text-sm' type="text" id="post_description" name="post_description" defaultValue={(postData?.postMeta?.post_description)}></textarea>
                    </div>
                    <button type='submit' disabled={saving} className='self-end my-1 bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>Save</button>
                </form>
            )
}