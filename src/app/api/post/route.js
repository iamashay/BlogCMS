import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { authorizeUser } from "@/lib/Authorize";
const prisma = new PrismaClient()

const revalidatePostRelevant = (slug, newPost) => {
    revalidatePath('/', "page")
    if (!newPost) revalidatePath('/post/'+slug, "page")
}

async function GET(req) {
    try {
        const postList = await prisma.post.findMany(
            {
                take: 15, 
                orderBy: [ { createdAt: 'desc' } ], 
                select: { 
                    userId: false,
                    title: true,
                    slug: true,
                    createdAt: true,
                    updatedAt: true,
                    body: true,
                    author: {select: {username: true}},
                } 
            }
        )
        return NextResponse.json(postList, {status: 200})
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
        const session = await authorizeUser()
        if (!await authorizeUser) return NextResponse.json({error: "Invalid permission"}, {status: 500})
        const {title, body, slug} = await req.json()
        const savePost = await prisma.post.create({
            data: {
                title,
                body,
                slug,
                author: {
                    connect: {username: session?.user?.username}
                },

            }
        })
        revalidatePostRelevant('/post/'+savePost.slug, true)
        return NextResponse.json(savePost, {status: 200})
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err?.code === 'P2002') {
                if (err?.meta?.target[0] === 'slug') return NextResponse.json({error: 'Slug already exists'}, {status: 500})
            }
        }
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

async function PUT(req) {
    try {
        const {title, body, slug, id} = await req.json()
        console.log({title, body, slug, id})
        const getUser = await prisma.post.findUnique({select: {author: {select: {username: true}}}, where: {id}})
        if (!await authorizeUser({username: getUser.author.username, role: ['User', 'Admin'], compareRole:true, compareUser: true})) return NextResponse.json({error: "Invalid permission"}, {status: 500})

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
        const getUser = await prisma.post.findUnique({select: {author: {select: {username: true}}}, where: {id}})
        if (!await authorizeUser({username: getUser.author.username, role: ['User', 'Admin'], compareRole:true, compareUser: true})) return NextResponse.json({error: "Invalid permission"}, {status: 500})
        const deletePost = await prisma.post.delete({where: {id}})
        revalidatePostRelevant('/post/'+deletePost.slug)
        return NextResponse.json(deletePost, {status: 200})
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
             if (err?.code === 'P2025') {
                return NextResponse.json({error: 'Post doesn\'t exist'}, {status: 500})
            }
        }
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export { POST, PUT, GET, DELETE }
