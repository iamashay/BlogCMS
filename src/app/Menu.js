'use client'

import Link from "next/link"
import { useState } from "react"

function DropDown({name, href, child}) {

    return (
        
            <li className={` h-full group relative px-4 cursor-pointer flex items-center hover:border-b-2 border-b-2 border-b-transparent hover:border-b-orange-600 max-md:border-none max-md:block max-md:w-full max-md:text-center`}>
                <Link href={href} className="" >{name}</Link>
                {
                child?.length > 0 && 
                <ul className={`group-hover:max-h-44 group-hover:visible border-gray-100 border-b border-x max-h-0 invisible overflow-hidden shadow-md absolute transition-all px-3 bg-zinc-100 text-center top-[calc(100%+2px)] right-0 max-md:static`}>
                    {
                    child.map(menu =>
                        <DropDown key={menu.href} name={menu.name} href={menu.href} child={menu.child} />
                    )
                    }
                </ul>
                }
            </li>

    )
}

export default function Menu({headerData}){
    const [showMenu, setShowMenu] = useState(false)
    return (
    <>
            <nav>
                <ul className={`${!showMenu ? 'max-md:hidden' : 'max-md:flex'} h-full flex flex-row gap-8 items-center max-md:flex-col`}>
                    { 
                    headerData &&
                    headerData.map(menu => (
                        <DropDown key={menu.href} name={menu.name} href={menu.href} child={menu.child} />
                    ))

                    }
                </ul>
            </nav>
            <span className="absolute right-0 cursor-pointer mr-4 top-3 hidden max-md:inline" onClick={() => {setShowMenu((value)=> !value)}}>
                <div className="border-t-2 border-black w-4 my-1"></div>
                <div className="border-t-2 border-black w-4 my-1"></div>
                <div className="border-t-2 border-black w-4 my-1"></div>
            </span>
    </>
    )
}