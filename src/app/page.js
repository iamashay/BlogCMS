import Image from 'next/image'
import ArticleList from '@/components/ArticleList'

const topPosts = [
  {
    title: 'A very good post!',
    desc: 'Hi, this is a very good post you might want to read this to know more about it.',
    author: 'Ashay Jaiswal',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asdsdfasdasd',
    date: 'November 16, 2023'
  },
  {
    title: 'Are you a bot? Solve these captcha',
    desc: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    author: 'John Mc',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asda234sdasd',
    date: 'November 16, 2023',
  },
  {
    title: 'Are you a bot? Solve these captcha',
    desc: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    author: 'John Mc',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asda2f234sdasd',
    date: 'November 16, 2023',
  },
  {
    title: 'Are you a bot? Solve these captcha',
    desc: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    author: 'John Mc',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asda23f4fc234sdasd',
    date: 'November 16, 2023',
  },
  {
    title: 'Are you a bot? Solve these captcha',
    desc: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    author: 'John Mc',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/as234f3cv4f32dasdasd',
    date: 'November 16, 2023',
  },
  {
    title: 'Are you a bot? Solve these captcha',
    desc: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    author: 'John Mc',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asdafc234f324csdasd',
    date: 'November 16, 2023',
  },
  {
    title: 'Are you a bot? Solve these captcha',
    desc: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
    author: 'John Mc',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asda453f34f3fsdasd',
    date: 'November 16, 2023',
  },
]

export default function Home() {
  return (
    <div className='page-container p-4'>
      <main className='flex justify-center my-5'>
        <ArticleList data={topPosts}></ArticleList>
      </main>
    </div>
  )
}
