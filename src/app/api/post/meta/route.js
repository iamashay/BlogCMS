import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { authorizeUser } from "@/lib/Authorize";
import { revalidatePostRelevant } from "@/lib/PostFunctions";
const prisma = new PrismaClient()

async function PUT(req){
    try {
        const session = await authorizeUser()
        const {post_title, post_description, id, slug} = await req.json()
        const getUser = await prisma.post.findUnique({select: {author: {select: {username: true}}}, where: {id}})
        if (!await authorizeUser({role: ['Admin', 'User'], username: getUser?.author.username, compareRole:true, compareUser:true})) throw Error("Invalid Permission")
        const savePostMeta = await prisma.post.update({
            where: {
                id
            },
            data: {
                postMeta: {
                    upsert: {
                        update: {
                        post_title,
                        post_description,
                        },
                        create: {
                            post_title,
                            post_description,
                        }
                    }
                }
            }
        })
        revalidatePostRelevant('/post/'+slug, true)
        return NextResponse.json(savePostMeta, {status: 200})
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

export {PUT}