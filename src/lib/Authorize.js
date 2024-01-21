import { auth } from "@/auth";

export async function authorizeUser({username, compareUser, role, compareRole} = {}) {
    const session = await auth()
    // console.log({username, compareUser, role, compareRole})
    const roleCheck = role?.includes(session.user.role)
    if (!session) return false
    if (compareRole && !roleCheck) return false
    if (compareRole && roleCheck) return session
    if (compareUser && session.user.username !== username) return false
    return session
}