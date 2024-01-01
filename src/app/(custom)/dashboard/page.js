import Image from 'next/image'

export function SmallCard({name, value}){
  return (
  <section className='shadow-sm p-1 px-2 flex flex-col border border-gray-200 '>
    <h2 className='text-md text-left'>{name}</h2>
    <span className='text-5xl text-center p-6'>{value}</span>
  </section>
  )
}

const smallCardList = [
  {
    name: 'Post',
    value: '12',
    link: '/'
  },
  {
    name: 'Comment',
    value: '21',
    link: '/'
  },
]

export default function Home() {
  return (
      <main className='flex justify-center my-5   mx-5'>
        <div className='grid grid-cols-4 gap-10 break-words w-4/5'>
          {
            smallCardList.map((item) => <SmallCard key={item.name+item.value} name={item.name} value={item.value} />)
          }
        </div>
      </main>
  )
}
