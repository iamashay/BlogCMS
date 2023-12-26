
import Image from "next/image"
import Menu from "./Menu"
import Logo from "@/app/assets/logo.png"
import Link from "next/link"
import UserBox from "./UserBox"
import { headers } from 'next/headers'



  

const headerData = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Tech',
        href: '/category/tech',
        child: [
            {
                name: 'News',
                href: '/category/tech/news',
            },
            {
                name: 'Sale',
                href: '/category/tech/sale',
            }
        ]
    },
    {
        name: 'About Us',
        href: '/about-us',
    }
]

export default function Header() {

    return (
        <header className="w-full border-b-gray-100 border-b shadow	px-9 flex justify-between max-md:flex-col relative mb-2">
            <span className="flex-grow">
                <Link href='/' className="block w-fit">
                    <Image className="cursor-pointer"
                        src={Logo}
                        alt='blogcms logo'
                    />
                </Link>
            </span>
            <Menu headerData={headerData} className="flex-shrink"></Menu>
            <UserBox  className="self-center max-md:absolute max-md:top-1.5 max-md:right-10 max-md:mr-3 flex-shrink">
                <ul>
                    <Link href={"/login"}><li>Login</li></Link>
                    <Link href={"/register"}><li>Sign Up</li></Link>
                </ul>
            </UserBox>
        </header>
    )
}