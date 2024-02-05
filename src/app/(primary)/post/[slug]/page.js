import Article from "@/components/Article"
import Comment from "@/components/CommentBox"
import { Suspense, cache } from 'react'
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
import { getPostDataBySlug } from "@/lib/PostFunctions"
import { createSEOdesc } from "@/lib/PostFunctions"
const prisma = new PrismaClient()
const API_URL = process.env.API_URL



export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slug = params.slug
    const postData = await getPostDataBySlug(slug)

    const metaData = {
        title: postData?.postMeta?.post_title || postData?.title,
        description: createSEOdesc(postData?.body, 150),
        openGraph: {
          title: postData?.postMeta?.post_title || postData?.title,
          type: 'article',
          publishedTime: new Date(postData?.createdAt).toISOString() || new Date().toISOString(),
          modified_time: new Date(postData?.updatedAt).toISOString() || new Date().toISOString(),
          author: postData?.author?.username,
        },
    }

    if (postData?.postMeta?.post_description)
        metaData.description = postData?.postMeta?.post_description
    return metaData
    
}

// async function getPost (slug) {
//     //await new Promise((resolve, rejec) => setInterval(() => resolve(2), 9000))
//     try {
//         const postData = await fetch(API_URL+'/post/'+slug)
//         const postDataJSON = await postData.json()
//         console.log(postDataJSON)
//         return postDataJSON
//     } catch (e) {
//         console.log(e)
//         return {}
//     }

// }





export default async function ArticlePage({article, params}) {
    const {slug} = params
    const post = await getPostDataBySlug(slug)

    return (
        <div className='flex justify-center my-5'>
            <Article article={post}>
            {
                post.commentEnabled && 
                    <Comment slug={slug} />
            } 
            </Article>
        </div>

    )
}