import { cache } from 'react'
import { notFound, redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export const createSummary = (body, count) => {
    return body?.replace(/(<([^>]+)>)/gi, '').trim().slice(0, count || process.env.SUMMARY_CHAR_LIMIT)+'...'
}

export const createSEOdesc = (body, count) => {
    return body?.replace(/(<([^>]+)>)/gi, '').trim().slice(0, count || process.env.SUMMARY_CHAR_LIMIT)
}

export const formatDate = (date) => {
    const dateObj = new Date(date)
    return dateObj.toISOString().split('T')[0]
}

export const revalidatePostRelevant = (slug, newPost) => {
    revalidatePath('/', "page")
    if (!newPost) revalidatePath('/post/'+slug, "page")
}

export const getPostDataById =  cache( async (id) => {
    const postData = await prisma.post.findUnique({
        include: {
            author: {
                select: {
                    username: true
                }
            },
            postMeta: true
        },
        where: { id }
    })
    if (!postData) return notFound()
    return postData
})

export const getPostDataBySlug =  cache( async (slug) => {
    const postData = await prisma.post.findFirst({
        include: {
            author: {
                select: {
                    username: true
                }
            },
            postMeta: true
        },
        where: { slug }
    })
    if (!postData) throw Error("No post found!")
    return postData
})

export const getPostsByUser = cache(async (username) => {
    const postList = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {createdAt: 'desc'},
        where: {
            author: {
                username
            }
        }
    })
    console.log({
        include: {
            author: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {createdAt: 'desc'},
        where: {
            author: {
                username
            }
        }
    })
    return postList
})

export const getAllPosts = cache(async () => {
    const postList = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {createdAt: 'desc'}
    })
    return postList
})

