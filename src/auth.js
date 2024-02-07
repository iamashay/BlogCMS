import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client"
import bcryptjs from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { generateHashPassword, generateUsername } from "./lib/UserFunctions"

const prisma = new PrismaClient()

export const {
    handlers: { GET, POST },
    auth,
  } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "Joe" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          try {
            const {username, email, password} = credentials
            const user = await prisma.user.findFirst({where: {username}})
            //console.log('user ', user, username, credentials, {where: {username}})
            if (!user) throw new Error('No user found!')
            if (!password || !user.password) throw new Error('Invalid false password!')
            const validatePassword = await bcryptjs.compare(password, user.password)
            if (validatePassword) {
              const {username, role, email, id} = user
              return {username, role, email, id}
            } else {
              // throw new Error('Invalid Password')
              return null
            }
          } catch (e) {
              console.log(e)
              return null
          }

        },

      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        async profile(profile) {
          const name = profile.given_name + ' ' + profile.family_name
          const password = await generateHashPassword()
          const username = await generateUsername({word: name})
          return {
            id: profile.id,
            email: profile.email,
            image: profile.picture,
            name,
            username,
            password,
          }

        },
        allowDangerousEmailAccountLinking: true,
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
})
