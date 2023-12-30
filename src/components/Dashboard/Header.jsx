
'use client'
import Image from "next/image"
import Logo from "@/app/assets/logo.png"
import Link from "next/link"
import UserBoxSkeleton from "@/components/UserBoxSkeleton"
import { signOut } from "next-auth/react"


export default function Header() {

    return (
        <header className="w-full px-9 flex justify-end max-md:flex-col relative p-2">

            <UserBoxSkeleton  className="self-center max-md:absolute max-md:top-1.5 max-md:right-10 max-md:mr-3 flex-shrink " containerTop={'top-full'}>
                <ul>
                    <li className="cursor-pointer" onClick={() => signOut()}>Log out</li>
                </ul>
            </UserBoxSkeleton>
        </header>
    )
}