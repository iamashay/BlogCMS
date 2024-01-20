import { auth } from "@/auth";

export async function authorizeUser({username, compareUser, role, compareRole} = {}) {
    const session = await auth()
    // console.log({username, compareUser, role, compareRole})
    if (!session) return false
    if (compareUser && session.user.username !== username) return false
    if (compareRole && session.user.role !== role) return false
    return session
}