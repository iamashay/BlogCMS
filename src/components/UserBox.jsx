'use client'
import Link from "next/link"
import { useSession } from "next-auth/react"
import UserBoxSkeleton from "./UserBoxSkeleton"
import { signOut } from "next-auth/react"

const DefaultBoxData = () => {
    return <ul>
    <Link href={"/login"}><li>Login</li></Link>
    <Link href={"/register"}><li>Sign Up</li></Link>
    </ul>
}


export default function UserBox() {
    const {data: session, status} = useSession()
    console.log(session, status)
    const userData = session?.user
    return (
        <UserBoxSkeleton  className="self-center max-md:absolute max-md:top-1.5 max-md:right-10 max-md:mr-3 flex-shrink" image={session?.image}>
            {
                !(status === 'authenticated' && userData) ?
                <DefaultBoxData /> :
                <ul className="text-sm">
                    <li className="text-base">Hi, <span className="font-semibold">{userData.username}</span></li>
                    <li onClick={signOut} className="cursor-pointer">Logout</li>
                </ul>
            }

        </UserBoxSkeleton>
    )
}