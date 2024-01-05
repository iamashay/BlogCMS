import { auth } from "./auth"
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const session = await auth()
  // console.log(session)
  if (!session)
    return NextResponse.redirect(new URL('/login', request.url))
  //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}