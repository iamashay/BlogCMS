import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Link from 'next/link'
import Logo from '@/app/assets/logo.png'
import Image from 'next/image'
import UserBox from '@/components/UserBoxSkeleton'
import Sidebar from '@/components/Dashboard/Sidebar'
import Header from '@/components/Dashboard/Header'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `User Panel | ${process.env?.HOMEPAGE_TITLE}`, 
}

const menuData = [
  {
      name: 'Dashboard',
      href: '/dashboard',
  },
  {
      name: 'Post',
      child: [
          {
              name: 'Your Posts',
              href: '/dashboard/post',
          },
          {
              name: 'New Posts',
              href: '/dashboard/post/new',
          },
          {
              name: 'All Posts',
              href: '/dashboard/post/all',
              role: ['Admin'],
          }
      ]
  },
  {
    name: 'Comments',
    child: [
        // {
        //     name: 'Your Comments',
        //     href: '/dashboard/post',
        // },
        {
            name: 'All Comments',
            href: '/dashboard/comment',
            role: ['Admin'],
        },
    ],
    role: ['Admin'],
  },
  {
      name: 'User',
      child: [
          {
              name: 'All Users',
              href: '/category/tech/news',
              role: ['Admin'],
          },
          {
              name: 'Profile',
              href: '/dashboard/profile',
          },
      ]
  },
  {
      name: 'About Us',
      href: '/about-us',
  }
]


export default async function Layout({ children }) {  
  const session = await auth()
  if (!session)
  return redirect('/login')

  return (
    <html lang="en">
    <body className={`${inter.className} overflow-hidden h-screen`}>
      <Toaster></Toaster>
      <div className='flex flex-row w-full h-full'>
          <Sidebar menuData={menuData}  />
          <div className='flex flex-col flex-grow overflow-auto'>
            <Header />
            {children}
          </div>
      </div>
    </body>
    </html>

  )
}
