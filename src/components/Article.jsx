import { WriterIcon, DateIcon } from "./SVG"
import { formatDate } from "@/lib/PostFunctions"
export default function Article({article, children}) {
    const date = formatDate(article.createdAt)
    return (
        <article className="w-full md:w-4/6 max-md:p-2 lg:w-3/6 transition-all">
            <h1 className="text-4xl  font-bold max-md:font-medium">{article.title}</h1>

            <footer className="my-4">
                <div className="flex gap-4 max-md:self-start">
                <span className="flex items-center gap-1 text-sm" ><DateIcon title="Posted date" /><time>{date}</time></span>
                    <span className="flex items-center gap-1 text-sm"><WriterIcon title="Posted by author" />{article.author?.username}</span>
                </div>
            </footer>

            <main id="post-body" className="my-8 notw">
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </main>
            {children}
        </article>
    )
}