import Image from "next/image"
import Menu from "./Menu"
import Logo from "@/app/assets/logo.png"
import Link from "next/link"
import UserBox from "./UserBox"
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
            <Link href='/' className="flex-grow">
                <Image className="cursor-pointer"
                    src={Logo}
                    alt='blogcms logo'
                />
            </Link>
            <Menu headerData={headerData}></Menu>
            <UserBox className="self-center cursor-pointer" />
        </header>
    )
}