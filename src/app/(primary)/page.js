
import Image from 'next/image'
import ArticleList from '@/components/ArticleList'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const API_URL = process.env.API_URL

async function getPosts() {
  //await new Promise((resolve, rejec) => setInterval(() => resolve(2), 9000))
  try {
    const postList = await fetch(API_URL+'/post/', {cache: 'no-cache'})
    const postListJSON = await postList.json()
    return postListJSON
  } catch (e) {
    console.log(e)
    return []
  }


}

export default async function Home() {
  const postList = await getPosts()
  //console.log(postList)
  return (
    <div className='page-container p-4'>
      <main className='flex justify-center my-5'>
        <ArticleList data={postList}></ArticleList>
      </main>
    </div>
  )
}
