'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast, { Toaster } from 'react-hot-toast';

export default function NewPost() {
    const editorRef = useRef(null);
    const [saving, setSaving] = useState(false)
    const submitPost = async (e) => {
        const savingMsg = toast.loading("Saving post...")
        e.preventDefault()
        setSaving(true)
        try {
            const formData = new FormData(e.target)
            const body = editorRef?.current?.getContent()
            const {title, slug} = Object.fromEntries(formData)
            // console.log(title, slug, body)
            const formatData = {
                title, 
                slug,
                body
            }
            const sendData = await fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify(formatData)
            })
            const sendDataJson = await sendData.json()
            toast.dismiss(savingMsg)
            if (!sendData.ok) {
                toast.error(sendDataJson?.error)
            } else {
                toast.success("Post saved!")
            }
            
        } catch(e){
            toast.error("Error saving the post")
        } finally {
            toast.dismiss(savingMsg)
            setSaving(false)
        }
        
    }

    return (
        <main className='flex flex-col justify-center my-5 mx-5'>
            <h1>New Post</h1>
            <div className=''>
                <form onSubmit={submitPost} method="post" className='flex flex-col'>
                    <input name="title" id="title" placeholder="Enter Title" required className='border border-gray-300 my-3 p-1 w-full shadow-sm'></input>
                    <div className='flex gap-4 items-center'>
                        <label htmlFor="slug">Slug:</label><input className='flex-grow border border-gray-300 my-2 p-1 w-full shadow-sm text-sm' type="text" id="slug" name="slug"></input>
                    </div>
                    <Editor 
                    onInit={(evt, editor) => editorRef.current = editor}
                    apiKey='o7iuyugse4xec4wuzij8iyena1xztv24vfwi0yt9m0q9fh74'
                    init={{
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                        placeholder: "Your post content goes here!",
                    }}
                    />
                    <button type='submit' disabled={saving} className='self-end my-4 bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>Submit</button>
                </form>
            </div>
        <Toaster />
        </main>
    )
}