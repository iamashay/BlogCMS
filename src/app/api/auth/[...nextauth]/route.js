import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client"
import bcryptjs from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()

const authOptions = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "Joe" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          console.log('asdasdsadas')
          const {username, email, password} = credentials
          const user = await prisma.user.findUnique({where: {username}})
          console.log('user ', user, username, credentials, {where: {username}})
          if (!user) throw new Error('No user found!')
          const validatePassword = await bcryptjs.compare(password, user.password)
          if (validatePassword) {
            return user
          } else {
            throw new Error('Invalid Password')
    
          }
        }
      })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  secret: "asdasdasdk789",
  debug: process.env.NODE_ENV !== "production"
}

const  handler  = NextAuth(authOptions)

export {handler as GET, handler as POST}