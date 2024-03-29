'use client'
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';


export function CommentForm({commentData, create}) {
    const router = useRouter()
    const editorRef = useRef(null);
    const [saving, setSaving] = useState(false)
    const submitComment = async (e) => {
        const savingMsg = toast.loading("Saving comment...")
        e.preventDefault()
        setSaving(true)
        try {
            const formData = new FormData(e.target)
            const body = editorRef?.current?.getContent()
            const {id} = commentData
            const {
                guestName,
                email,
            } = Object.fromEntries(formData)
            // console.log(title, slug, body)
            const formatData = {
                body, 
                guestName,
                email,
                id,
            }
            let formMethod = 'POST'
            if (!create) {
                formatData.id = commentData.id
                formMethod = 'PUT'
            }
            const sendData = await fetch('/api/comment', {
                method: formMethod,
                body: JSON.stringify(formatData)
            })
            const sendDataJson = await sendData.json()
            toast.dismiss(savingMsg)
            if (!sendData.ok) {
                toast.error(sendDataJson?.error)
            } else {
                toast.success("Comment saved!")
            }
            
        } catch(e){
            toast.error("Error saving the post")
        } finally {
            toast.dismiss(savingMsg)
            setSaving(false)
        }
        
    }

    return (
                <form onSubmit={submitComment}  className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                        <label htmlFor="guestName">Name:</label><input className='flex-grow border border-gray-300 my-2 p-1 w-full shadow-sm text-sm' type="text" id="guestName" name="guestName" defaultValue={(commentData?.guestName)}></input>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <label htmlFor="email">Email:</label><input className='flex-grow border border-gray-300 my-2 p-1 w-full shadow-sm text-sm' type="text" id="email" name="email" defaultValue={(commentData?.email)}></input>
                    </div>
                    <label for={'body'}>
                        Comment:
                    </label>
                    <textarea name="body" id="body" className='border border-gray-300 my-2 p-1 h-28' placeholder='Enter your comment body' row={20}>{commentData?.body}</textarea>
                    <button type='submit' disabled={saving} className='self-end my-4 bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white'>Submit</button>
                </form>
            )
}