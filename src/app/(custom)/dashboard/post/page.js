import PostListTable from "@/components/Dashboard/PostListTable"
import { getPostsByUser, getAllPosts } from "@/lib/PostFunctions"

const defaultData = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    }
]



export default async function ViewPost({searchParams}) {
    const {showAll} = searchParams
    let defaultData
    showAll ?   defaultData = await getAllPosts()
              : defaultData = await getAllPosts()
    //console.log(defaultData)
    return (
        <main className='m-5'>
            <h1 className="fle">Your Posts</h1>
            <PostListTable defaultData={defaultData}></PostListTable>
        </main>
    )
}