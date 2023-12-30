import Image from "next/image"
import Menu from "./Menu"
import Logo from "@/app/assets/logo.png"
import Link from "next/link"
import UserBox from "./UserBox"
// import { authOptions } from '@/app/api/auth/[...nextauth]/route.js'
// import { getServerSession } from "next-auth/next"

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions)
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       session,
//     },
//   }
// }


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
            <UserBox />
        </header>
    )
}