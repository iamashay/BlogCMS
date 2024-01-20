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
        const commentList = await prisma.comment.findMany(
            {
                take: 6, 
                // orderBy: [ { createdAt: 'desc' } ], 
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
                }
            }
        )
        return NextResponse.json(commentList, {status: 200})
    }catch(err){
        // if (err instanceof Prisma.PrismaClientKnownRequestError) {
        //     // The .code property can be accessed in a type-safe manner
        //     if (err?.code === 'P2002') {
        //         if (err?.meta?.target[0] === 'slug') return NextResponse.json({error: 'Slug already exists'}, {status: 500})
        //     }
        // }
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

async function POST(req){
    try {
        const session = await auth()
        const {guestName, body, parentComment, slug} = await req.json()
        const query = {
            guestName,
            body,
            post: {
                connect: {slug}
            },
        }
        if (parentComment) query.parentComment = {
            connect: {id: parentComment}
        }
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
