import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Header from '@/components/Header.jsx'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: process.env?.HOMEPAGE_TITLE,
  description: process.env?.HOMEPAGE_DESCRIPTION,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
      </body>
    </html>
  )
}
