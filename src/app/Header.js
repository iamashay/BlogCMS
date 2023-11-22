import Image from "next/image"
import Menu from "./Menu"
import Logo from "./assets/logo.png"
import Link from "next/link"

const headerData = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Tech',
        href: '/category/tech',
        children: [
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
        <header className="w-full border-b-gray-100 border-b shadow	px-9 flex justify-between">
            <Link href='/'>
                <Image className="cursor-pointer"
                    src={Logo}
                    alt='blogcms logo'
                />
            </Link>
            <nav>
                <ul className="h-full flex flex-row gap-8 items-center">
                    { 
                    headerData &&
                    headerData.map(menu => (
                        <Menu key={menu.href} menu={menu}></Menu>
                    ))

                    }
                </ul>
            </nav>
        </header>
    )
}