import { cache } from 'react'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createSummary = (body, limit = process?.env?.SUMMARY_CHAR_LIMIT) => {
    return body?.replace(/(<([^>]+)>)/gi, '').trim().slice(0, limit)+'...'
}

export const formatDate = (date) => {
    return date?.split('T')[0]
}

export const getCommentDataById =  cache( async (id) => {
    const commentData = await prisma.comment.findUnique({
        include: {
            author: {
                select: {
                    username: true
                }
            }
        },
        where: { id }
    })
    if (!commentData) return redirect('/')
    return commentData
})

export const getCommentsByUser = cache(async (username) => {
    const commentList = await prisma.comment.findMany({
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
    
    return commentList
})

export const getAllComments = cache(async () => {
    const commentList = await prisma.comment.findMany({
        include: {
            author: {
                select: {
                    username: true
                }
            },
            post: {
                select: {
                    title: true
                }
            }
        },
        orderBy: {createdAt: 'desc'}
    })
    return commentList
})

