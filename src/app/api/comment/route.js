import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
const prisma = new PrismaClient()
import { authorizeUser } from "@/lib/Authorize"


async function GET(req, searchParams) {
    try {
        const slug = await req.nextUrl.searchParams.get('slug')
        const cursor = await req.nextUrl.searchParams.get('cursor')
        const limit = await req.nextUrl.searchParams.get('limit')
        const isCount = await req.nextUrl.searchParams.get('count')
        if (isCount) 
            return NextResponse.json(await prisma.comment.count(), {status: 200})
        const where = { 
                post: {
                    slug
                }
        }
        const findQuery = {
            orderBy: [ { createdAt: 'asc' } ], 
            select: {
                id: true,
                guestName: true,
                body: true,
                createdAt: true,
                author: {select: {username: true}},
            },
            where,
        }
        if (limit) findQuery.take = limit
        if (cursor) findQuery.cursor = {id: cursor}
        const commentList = await prisma.$transaction([
            prisma.comment.count({where}),
            prisma.comment.findMany(findQuery)])
        return NextResponse.json(commentList, {status: 200})
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

async function PUT(req) {
    try {
        if (!await authorizeUser({role: ['Admin'], compareRole:true})) throw Error("Invalid Permission")
        const {body, guestName, email, id} = await req.json()
        console.log({body, guestName, email, id})
        const updateComment = await prisma.comment.update({
            data: {
                body, 
                guestName, 
                id,
                email
            },
            where: {
                id
            },

        })
        return NextResponse.json(updateComment, {status: 200})
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
        revalidatePostRelevant('/post/'+deletePost.slug)
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
