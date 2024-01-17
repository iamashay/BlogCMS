'use client'

import { useState } from "react"
import { CloseIcon } from "../SVG"

export function PopUp({onClick}) {
    const [hide, setHide] = useState(false)
    const handleHidePopupOnOverlay = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target !== e.currentTarget) {
            // Click occurred inside the child div, don't hide
            return;
        }
        setHide(true)
    }

    const handleClosePopup = (e) => {
        setHide(true)
    }

    const handleOnClick = (e) => {
        onClick()
        handleClosePopup()
    }

    return (
        <div className={`fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 z-50 ${hide && 'hidden'}`} onClick={handleHidePopupOnOverlay}>
            <div className="absolute left-[50vw] top-1/4 bg-white px-2 flex flex-col gap-3 rounded-md max-w-xs">
                <div className={`absolute right-0 cursor-pointer m-1`} onClick={handleClosePopup}>
                    <CloseIcon/>
                </div>
                <div className="pt-8">
                    Are you sure you want to do this?
                </div>
                <div className="self-center">
                    <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-100 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleOnClick}>Confirm</button>
                    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-100 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleClosePopup}>Cancel</button>
                </div>
            </div>
        </div>
    )
}