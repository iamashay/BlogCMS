'use client'
import {  useEffect, useState } from "react"
import { UserIcon } from "./SVG"
import { usePathname } from "next/navigation"
import Image from "next/image"

import { useSession } from "next-auth/react"


export default function UserBoxSkeleton({className, children, containerTop, image}) {
    const [openBox, setOpenBox] = useState(false)
    const currentURL = usePathname()

    useEffect(() => setOpenBox(false), [currentURL])

    return (
        <span className={`${className} relative`} >
            <div onClick={() => setOpenBox(!openBox)} className="cursor-pointer">
                {image ? <Image src={image} alt={'user avatar'} width={8} height={8}></Image> : <UserIcon title="User" />}
            </div>
            <div style={{display: openBox ? 'block' : 'none'}} className = {`bg-white shadow-lg absolute -right-3  mr-4 p-4 w-max `+ (containerTop  || 'top-11')}>
                {children} 
            </div>
        </span>
    )
}