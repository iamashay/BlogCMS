import SessionProvider from "@/lib/SessionProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions)
    //console.log(session)
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
