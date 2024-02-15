import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import { generateHashPassword } from "@/lib/UserFunctions"
const prisma = new PrismaClient()

export async function POST(req) {
    try {
        //console.log(req.body)
        const {username, email, password} = await req.json()
        const hashPass = await generateHashPassword()
        const createUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashPass,
            }
        })
        //console.log(createUser)
        return NextResponse.json({ createdAt: createUser.createdAt }, {status: 200})
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === 'P2002') {
                if (err.meta.target[0] === 'email') return NextResponse.json({error: 'Email is already registered'}, {status: 500})
                if (err.meta.target[0] === 'username') return NextResponse.json({error: 'Username isn\'t available'}, {status: 500})

            }
        }
        return NextResponse.json({error: err.message}, {status: 500})
    }
}