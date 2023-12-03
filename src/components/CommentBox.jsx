function CommentList({data}) {

    return (
        <section>
            {
                data?.length > 0 && 
                data.map((comment)=> {
                    return (
                    <article key={comment._id} className="bg-gray-200 my-2 p-2">
                        <header className="text-sm"><b>{comment.name}</b> commented on <time>{comment.date}</time></header>
                        <p className="p-1">{comment.body}</p>
                    </article>
                    )
                })
            }
        </section>
    ) 
}

function CommentForm() {
    return (
    <form className="flex flex-col">
        <div className="relative z-0 w-fit my-5 group">
            <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-fit mb-5 group">
            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>
        <div className="w-full mb-5"> 
            <label htmlFor="comment" className="sr-only">Your comment</label> 
            <textarea className="resize rounded-md w-full border p-2 border-gray-600 focus:border-blue-600 focus:outline-none focus:ring-1" placeholder="Enter your comment"></textarea>
        </div>
        <button type="submit" className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
    </form>
    )
}

export default function Comment({data}) {
    return (
        <section>
        <h3 className="text-lg font-semibold">Comments:</h3>
            <CommentForm />
            <CommentList data={data} />
        </section>
    )
}