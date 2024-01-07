import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

async function GET(req, {params}) {
    // console.log(req.query)
    const {slug} = params

    try {
        const postList = await prisma.post.findFirst({
            where: {slug},
            select: { 
                userId: false,
                title: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                body: true,
                author: {select: {username: true}},
            } 
        })
        if (!postList) throw Error("No post found!") 
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

export { GET }