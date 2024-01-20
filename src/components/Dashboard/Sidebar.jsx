'use client'
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"
import Logo from '@/app/assets/logo.png'
import { UserIcon } from "../SVG"
import Link from "next/link"
import { useState } from "react"
import { LeftArrowIcon } from "../SVG"
import { useSession } from "next-auth/react"

function Menu({item, role}) {
    const pathName = usePathname()
    const isRender = item?.role ? item?.role === role : true
    return isRender && (
        <div className="my-2">
            {
                !item?.href ?
                <>
                    <h3 className="text-gray-400 mx-2">{item?.name}</h3>
                    <div className="text-sm">
                        { 
                            item?.child?.length > 0 && item.child.map(childItem => (childItem?.role ? childItem?.role === role : true) && (
                                <Link href={childItem.href} key={childItem.name+(+new Date())} className={`${pathName === childItem.href && 'bg-gray-300 disabled:pointer-events-none'} mx-4 p-1 cursor-pointer hover:bg-gray-100 block transition-all rounded`}>{childItem.name}</Link>
                            ))
                        }
                    </div>
                </> 
                :
                <>
                    <Link href={item.href} className={`${pathName === item.href && 'bg-gray-300 disabled:pointer-events-none'} mx-1 p-1 my-2 cursor-pointer hover:bg-gray-100 transition-all block rounded`}><h3>{item?.name}</h3></Link>
                </>
            }

        </div>
    )
}

export default function Sidebar({menuData}) {
    const [showSidebar, setShowSidebar] = useState(true)
    const {data: session, status} = useSession()
    const userData = session?.user
    return (
        <div className="relative">
            <aside className={`h-screen flex flex-col shadow-xl sticky overflow-x-hidden transition-all duration-300 ${showSidebar ? 'w-56' : 'w-0 opacity-0'}`}>
                <Link href='/dashboard'><Image src={Logo} alt='logo' /></Link>
                <div className="flex items-center text-sm gap-2 m-4 rounded-md p-2 bg-slate-200"><UserIcon className="flex-shrink-0"/> <span className="break-words">{userData?.username || 'Not Found'}</span></div>
                <div>
                    {
                        menuData?.length > 0 && menuData.map((item) => <Menu key={item.name+(+new Date())} item={item} role={session?.user?.role}/>)
                    }
                </div>  

            </aside>
            <div className={`absolute  top-1 shadow-l bg-white border-y border-r cursor-pointer z-10 transition-all ${showSidebar ? 'left-56' : 'left'}`} onClick={() => setShowSidebar(!showSidebar)}>
                    <LeftArrowIcon title={'minimize sidebar'} className={`transition-all duration-300 ${showSidebar && 'rotate-180'}`}/>
            </div>
        </div>
    )
} 