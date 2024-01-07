import Link from "next/link"
import { WriterIcon, DateIcon } from "./SVG"
import { createSummary, formatDate } from "@/lib/PostFunctions"


function ArticleCard ({article}) {
    const postLink= "/post/"+article?.slug
    const body = createSummary(article?.body)
    const date = formatDate(article?.createdAt)
    return (
        <article className="flex flex-col gap-1 p-3 shadow-sm border-b border-stone-300 group">
            <header>
                <h2 className="text-lg font-semibold"><Link className="pb-1 after:h-[2px] inline-block after:w-0 after:transition-all after:ease-in-out after:duration-500 group-hover:after:w-full after:bg-orange-700 after:content-[''] after:block" href={postLink}>{article.title}</Link></h2>
            </header>
            <p>{body}</p>
            <footer className="flex justify-between items-end gap-2 max-md:flex-col">
                <div className="flex gap-4 max-md:self-start">
                    <span className="flex items-center gap-1 text-sm" ><DateIcon title="Posted date" /><time>{date}</time></span>
                    <span className="flex items-center gap-1 text-sm"><WriterIcon title="Posted by author" />{article?.author?.username}</span>
                </div>
                <Link href={postLink} className="relative inline-block px-4 py-2 font-medium group/button">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover/button:-translate-x-0 group-hover/button:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover/button:bg-black"></span>
                    <span className="relative text-black group-hover/button:text-white">Read Me</span>
                </Link>
            </footer>
        </article>
    )
}

export default function ArticleList({data}) {
    return (
        <section className="grid grid-cols-1 max-md:grid-cols-1 gap-4 w-4/5">
            {data.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </section>
    )
}