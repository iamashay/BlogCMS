import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

async function POST(req){
    try {
        const {title, body, slug} = await req.json()
        const savePost = await prisma.post.create({
            data: {
                title,
                body,
                slug,
                author: {
                    connect: {id: '09f94b4d-4c97-4fa0-9d92-a7a0f34e8164'}
                },

            }
        })
        
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

export { POST }
