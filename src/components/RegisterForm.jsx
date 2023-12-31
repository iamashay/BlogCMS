'use client'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
export default function RegisterForm() {
    const [loading, setLoading] = useState(false)

    const registerUser = (event) => {
        event.preventDefault();
        setLoading(true)
        const signUpLoadMsg = toast.loading("Signing Up...")
        const form = new FormData(event.target)
        const formData = Object.fromEntries(form)
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(async res => {
            toast.dismiss(signUpLoadMsg)
            const resBody = await res.json()
            if (res.ok) {
                toast.success("Your account has been created! Please login!")
                return 
            }
            console.log(resBody, res)
            toast.error(resBody.error)
        })
    }

    return (

        <>
            <form className="flex flex-col" method="POST" onSubmit={registerUser} disabled={loading}>
                <div className="relative z-0 w-fit my-5 group">
                    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-fit mb-5 group">
                    <input type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                <div className="relative z-0 w-fit mb-5 group">
                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
            </form>
            <Toaster/>
        </>
        
    )
}