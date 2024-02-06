import { SmallCardSkeleton } from '@/components/LoadingSkeleton/SmallCard'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
const API_URL = process.env.API_URL
export async function SmallCard({name, value, link, fetchURL}){
  let getData
  if (fetchURL) {
    const getData = await fetch(fetchURL)
    value = await getData.text()
  }
  if(!link) link = ''
  return (
  <Link href={link}>
    <section className='shadow-sm p-1 px-2 flex flex-col border border-gray-200 '>
      <h2 className='text-md text-left'>{name}</h2>
      <span className='text-5xl text-center p-6'>{value}</span>
    </section>
  </Link>
  )
}

const smallCardList = [
  {
    name: 'All Posts',
    value: '12',
    link: '/',
    fetchURL: API_URL+'/post?count=true',
    link: '/dashboard/post/'
  },
  {
    name: 'All Comments',
    value: '21',
    link: '/',
    fetchURL: API_URL+'/comment?count=true',
  },
]

export default function Home() {
  return (
      <main className='flex justify-center my-5   mx-5'>
        <div className='grid grid-cols-4 gap-10 break-words w-4/5'>
          {
            smallCardList.map((item) => (
                <SmallCard key={item.name+item.value} name={item.name} value={item.value} link={item.link} fetchURL={item.fetchURL} />
            ))
          }
        </div>
      </main>
  )
}
