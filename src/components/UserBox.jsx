'use client'
import { useState } from "react"
import { UserIcon } from "./SVG"
import Image from "next/image"
export default function UserBox({className}) {
    return (
        <span className={`${className} relative`}>
            <UserIcon title="User"  />
            <div className="absolute bg-slate-500">
                asd 
            </div>
        </span>
    )
}