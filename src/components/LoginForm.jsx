'use client'
import toast, { Toaster } from 'react-hot-toast';

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { GoogleBtn } from './AuthButton';
export default function Login() {
    const router = useRouter()
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })



    const [loading, setLoading] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const loginMsgId = toast.loading("Logging In")
        const signInStatus = await signIn('credentials', {
            ...loginData,
            redirect: false
        })
        console.log(signInStatus)
        setLoading(false)
        toast.dismiss(loginMsgId)
        console.log(signInStatus)
        if (signInStatus?.error) {
            return toast.error("Invalid login")

        }
        toast.success("Login success")
        router.push("/")
    }   

    return (

        <>
            <form className="flex flex-col" onSubmit={loginUser}>
                <div className="relative z-0 w-fit mb-5 group">
                    <input type="text" name="username" id="username" onChange={(e) => setLoginData({...loginData, username: e.target.value})} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                <div className="relative z-0 w-fit mb-5 group">
                    <input type="password" name="password" id="password" onChange={(e) => setLoginData({...loginData, password: e.target.value})}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" disabled={loading} className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
            </form>
            <div className='my-5'>
                <GoogleBtn onClick={() => signIn('google')}></GoogleBtn>
            </div>
            <Toaster/>
        </>
    )
}