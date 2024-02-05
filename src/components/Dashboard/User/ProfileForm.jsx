'use client'
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

const submitProfile = async (id, e, editorRef, setSaving, router) => {
    
    const savingMsg = toast.loading("Saving user...")
    e.preventDefault()
    setSaving(true)
    try {
        const formData = new FormData(e.target)
        const {name, username, email, password} = Object.fromEntries(formData)
        // console.log(title, slug, body)
        const formatData = {
            name, 
            username,
            email,
            password,
        }
        
        let formMethod = 'PUT'
        const sendData = await fetch('/api/user/'+id, {
            method: formMethod,
            body: JSON.stringify(formatData)
        })
        const sendDataJson = await sendData.json()
        toast.dismiss(savingMsg)
        if (!sendData.ok) {
            toast.error(sendDataJson?.error)
        } else {
            toast.success("User saved!")
            router.refresh()
            //if (create) router.push('/dashboard/post/edit/'+sendDataJson?.id)
        }
        
    } catch(e){
        toast.error("Error saving the user data")
    } finally {
        toast.dismiss(savingMsg)
        setSaving(false)
    }
    
}

export function ProfileForm({userData, create}) {
    const router = useRouter()

    const editorRef = useRef(null);
    const [saving, setSaving] = useState(false)
    

    return (
                <form onSubmit={(e) => submitProfile(userData?.id, e, editorRef, setSaving, router)} method="post" className='flex flex-col'>
                    <div className='grid grid-cols-2 gap-4'>
                            
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="name">Name</label><input className='flex-grow border border-gray-300 my-2 p-1  shadow-sm text-sm' type="text" id="name" name="name" defaultValue={(userData?.name)}></input>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="username">Username</label><input className='flex-grow border border-gray-300 my-2 p-1 w-1/5 shadow-sm text-sm' type="text" id="username" name="username" defaultValue={(userData?.username)}></input>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="email">Email</label><input className='flex-grow border border-gray-300 my-2 p-1 w-1/5 shadow-sm text-sm' type="text" id="email" name="email" defaultValue={(userData?.email)} disabled></input>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <label htmlFor="password">Password</label><input className='flex-grow border border-gray-300 my-2 p-1 w-1/5 shadow-sm text-sm' type="text" id="password" name="password" placeholder="**********"></input>
                        </div>
                    </div>
                    <button type='submit' disabled={saving} className='self-end my-4 bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white col-start-2 w-1/4 items-end'>Submit</button>

                </form>
            )
}