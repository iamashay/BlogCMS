import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client"
import bcryptjs from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
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
          const {username, email, password} = credentials
          const user = await prisma.user.findUnique({where: {username}})
          //console.log('user ', user, username, credentials, {where: {username}})
          if (!user) throw new Error('No user found!')
          const validatePassword = await bcryptjs.compare(password, user.password)
          if (validatePassword) {
            const {username, role, email} = user
            return {username, role, email}
          } else {
            throw new Error('Invalid Password')
    
          }
        },

      }),


  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
          session.user = token.user
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET,
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production"
}

const handler  = NextAuth(authOptions)

export {handler as GET, handler as POST}