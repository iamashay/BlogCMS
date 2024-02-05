import SessionProvider from "@/lib/SessionProvider"
import {auth} from '@/auth'
import { cache } from 'react'

export default async function RootLayout({ children }) {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
