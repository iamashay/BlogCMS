import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
const prisma = new PrismaClient()

const revalidatePostRelevant = (slug, newPost) => {
    revalidatePath('/', "page")
    if (!newPost) revalidatePath('/post/'+slug, "page")
}

async function GET(req, searchParams) {
    try {
        const slug = await req.nextUrl.searchParams.get('slug')
        const cursor = await req.nextUrl.searchParams.get('cursor')
        const limit = await req.nextUrl.searchParams.get('limit')
        const findQuery = {
            orderBy: [ { createdAt: 'asc' } ], 
            select: {
                id: true,
                guestName: true,
                body: true,
                createdAt: true,
                author: {select: {username: true}},
            },
            where: {
                post: {
                    slug
                }
            },
        }
        if (limit) findQuery.take = limit
        if (cursor) findQuery.cursor = {id: cursor}
        const commentList = await prisma.$transaction([
            prisma.comment.count(),
            prisma.comment.findMany(findQuery)])
        return NextResponse.json(commentList, {status: 200})
    }catch(err){
        // if (err instanceof Prisma.PrismaClientKnownRequestError) {
        //     // The .code property can be accessed in a type-safe manner
        //     if (err?.code === 'P2002') {
        //         if (err?.meta?.target[0] === 'slug') return NextResponse.json({error: 'Slug already exists'}, {status: 500})
        //     }
        // } 
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
        revalidatePostRelevant('/post/'+slug, true)
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
        const {title, body, slug, id} = await req.json()
        console.log({title, body, slug, id})
        const updatePost = await prisma.post.update({
            data: {
                title,
                body,
                slug,
            },
            where: {
                id
            }
        })
        revalidatePostRelevant('/post/'+updatePost.slug)
        return NextResponse.json(updatePost, {status: 200})
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

async function DELETE(req) {
    try {
        const {id} = await req.json()
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
