import { cache } from 'react'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createSummary = (body) => {
    return body?.replace(/(<([^>]+)>)/gi, '').trim().slice(0, process.env.SUMMARY_CHAR_LIMIT)+'...'
}

export const formatDate = (date) => {
    return date?.split('T')[0]
}

export const getPostDataById =  cache( async (id) => {
    const postData = await prisma.post.findUnique({
        where: { id }
    })
    if (!postData) redirect('/dashboard/post/new')
    return postData
})

export const getPostsByUser = cache(async (username) => {
    const postList = await prisma.post.findMany({
        include: {
            author: {
                where: {username}
            }
        }
    })
})

export const getAllPosts = cache(async (username) => {
    const postList = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })
    return postList
})