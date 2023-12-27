'use client'
import {  useEffect, useState } from "react"
import { UserIcon } from "./SVG"
import { usePathname } from "next/navigation"
import Image from "next/image"

export async function getStaticProps() {
    const headerMenuId = +new Date()
    return { props: { headerMenuId } }
}

export default function UserBox({className, children, containerTop}) {
    const [openBox, setOpenBox] = useState(false)
    const currentURL = usePathname()
    console.log(currentURL)
    useEffect(() => setOpenBox(false), [currentURL])

    return (
        <span className={`${className} relative`} >
            <div onClick={() => setOpenBox(!openBox)} className="cursor-pointer">
                <UserIcon title="User" />
            </div>
            <div style={{display: openBox ? 'block' : 'none'}} className = {`bg-white shadow-lg absolute -right-3  mr-4 p-4 w-max `+ (containerTop  || 'top-11')}>
                {children} 
            </div>
        </span>
    )
}