import Article from "@/components/Article"
import Comment from "@/components/CommentBox"
import { cache } from 'react'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id
    return {
      title: "Hi",
      description: 'This is a blogpost!',
    }
}

const post = {
    title: 'A very good post!',
    desc: 'Hi, this is a very good post you might want to read this to know more about it.',
    author: 'Ashay Jaiswal',
    imageURL: 'https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/console-logging-featured.png',
    link: '/asdsdfasdasd',
    date: 'November 16, 2023',
    body: `<h1><a id="user-content-official-tinymce-react-component" class="anchor" aria-hidden="true" href="#official-tinymce-react-component"><svg aria-hidden="true" role="img" class="octicon octicon-link" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;user-select:none;vertical-align:middle"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Official TinyMCE React component</h1>
    <h2><a id="user-content-about" class="anchor" aria-hidden="true" href="#about"><svg aria-hidden="true" role="img" class="octicon octicon-link" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;user-select:none;vertical-align:middle"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>About</h2>
    <p>This package is a thin wrapper around <a href="https://github.com/tinymce/tinymce">TinyMCE</a> to make it easier to use in a React application.</p>
    <ul>
    <li>If you need detailed documentation on TinyMCE, see: <a href="https://www.tiny.cloud/docs/tinymce/6/" rel="nofollow">TinyMCE Documentation</a>.</li>
    <li>For the TinyMCE React Quick Start, see: <a href="https://www.tiny.cloud/docs/tinymce/6/react-cloud/" rel="nofollow">TinyMCE Documentation - React Integration</a>.</li>
    <li>For the TinyMCE React Technical Reference, see: <a href="https://www.tiny.cloud/docs/tinymce/6/react-ref/" rel="nofollow">TinyMCE Documentation - TinyMCE React Technical Reference</a>.</li>
    <li>For our quick demos, check out the TinyMCE React <a href="https://tinymce.github.io/tinymce-react/" rel="nofollow">Storybook</a>.</li>
    </ul>
    <h3><a id="user-content-issues" class="anchor" aria-hidden="true" href="#issues"><svg aria-hidden="true" role="img" class="octicon octicon-link" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display:inline-block;user-select:none;vertical-align:middle"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Issues</h3>
    <p>Have you found an issue with tinymce-react or do you have a feature request? Open up an <a href="https://github.com/tinymce/tinymce-react/issues">issue</a> and let us know or submit a <a href="https://github.com/tinymce/tinymce-react/pulls">pull request</a>. <em>Note: For issues concerning TinyMCE please visit the <a href="https://github.com/tinymce/tinymce">TinyMCE repository</a>.</em></p>
    `,
    commentEnabled: true,
}

const getPost = async () => {
    const postList = await fetch('/api/post/')
    console.log(postList)
}

const postComment = [
    {
        _id: 1,
        name: "Akarsh",
        body: "Hey! Excellent Post",
        date: "2023-12-03"
    },
    {
        _id: 2,
        name: "Sahu",
        body: "I am going to buy this!",
        date: "2023-10-03"
    },
    {
        _id: 3,
        name: "Raj",
        body: "I don't agree with  you",
        date: "2023-11-03"
    },
    {
        _id: 4,
        name: "Sahil",
        body: "Hey! Excellent Post",
        date: "2023-12-03"
    },
]

export default function ArticlePage({article}) {[]
    return (
        <main className='flex justify-center my-5'>
            <Article article={post}>
            {
                post.commentEnabled && <Comment data={postComment} />
            } 
            </Article>
        </main>

    )
}