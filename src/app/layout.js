import SessionProvider from "@/lib/SessionProvider"
import {auth} from '@/auth'

export default async function RootLayout({ children }) {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
