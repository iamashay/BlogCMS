import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
const prisma = new PrismaClient()
import { authorizeUser } from "@/lib/Authorize"
import { getUserDataById } from "@/lib/UserFunctions"


async function GET(req, {params}) {
    try {
        const {id} = params
        const userData = await getUserDataById(id)
        return NextResponse.json(await userData, {status: 200})
    }catch(err){
        // if (err instanceof Prisma.PrismaClientKnownRequestError) {
         //     // The .code property can be accessed in a type-safe manner
        //     if (err?.code === 'P2002') {
        //         if (err?.meta?.target[0] === 'slug') return NextResponse.json({error: 'Slug already exists'}, {status: 500})
        //     }
        // } 
        console.log(err)
        if (err instanceof Prisma.PrismaClientValidationError ) {
            // The .code property can be accessed in a type-safe manner
            
            return NextResponse.json({error: 'Missing parameters'}, {status: 500})
        }
        return NextResponse.json({error: err.message, code: err.code}, {status: 500})
    }
}

async function POST(req){
    try {
        // const session = await auth()
        const {guestName, body, parentComment, email, slug} = await req.json()
        
        if (guestName && !email) throw Error('No email id entered')
        
        let query = {
            body,
            post: {
                connect: {slug}
            },
        }
        
        if (parentComment) query.parentComment = {
            connect: {id: parentComment}
        }
        
        if (guestName) query = {...query, guestName, email}

        const saveCommment = await prisma.comment.create({
            data: query
        })
        return NextResponse.json(saveCommment, {status: 200})
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            // if (err?.code === 'P2002') {
            //     if (err?.meta?.target[0] === 'slug') return NextResponse.json({error: 'Slug already exists'}, {status: 500})
            // }
        }
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

async function PUT(req, {params}) {
    try {
        // if (!await authorizeUser({username: ['Admin'], compareRole:true})) throw Error("Invalid Permission")
        const {id} = params
        const {name, email, password, username} = await req.json()
        console.log({name, email, password, username} )
        //console.log({body, guestName, email, id})
        const updateInfo = {
            data: {name, username},
            where: {
                id
            },
        }
        if (password && password.trim().length > 5) {
            updateInfo.data.password = password
        }
        const updateUser = await prisma.user.update(updateInfo)
        return NextResponse.json(updateUser, {status: 200})
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            // if (err?.code === 'P2002') {
            //     if (err?.meta?.target[0] === 'slug') return NextResponse.json({error: 'Slug already exists'}, {status: 500})
            // }
        }
        console.log(err)
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

async function DELETE(req) {
    try {
        const {id} = await req.json()
        if (!await authorizeUser({role: ['Admin'], compareRole:true})) throw Error("Invalid Permission")
        const deleteComment = await prisma.comment.delete({where: {id}})
        return NextResponse.json(deleteComment, {status: 200})
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
             if (err?.code === 'P2025') {
                return NextResponse.json({error: 'Comment doesn\'t exist'}, {status: 500})
            }
        }   
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export { POST, PUT, GET, DELETE }
