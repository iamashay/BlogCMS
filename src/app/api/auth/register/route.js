import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req) {
    try {
        //console.log(req.body)
        const {username, email, password} = await req.json()
        const hashPass = await bcryptjs.hash(password, 10)
        const createUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashPass,
            }
        })
        //console.log(createUser)
        return NextResponse.json(createUser, {status: 200})
    } catch(err) {
        return NextResponse.json({error: err.message}, {status: 500})
    }GET
}