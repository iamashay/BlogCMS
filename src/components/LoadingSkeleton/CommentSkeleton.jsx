import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export function CommentSkeleton({count}) {
    return (
        <>
        {
            Array.from({length: count})
                .map((_, index) => (
                    <article key={index}  className="bg-gray-200 my-2 p-2">
                        <header className="text-sm"><Skeleton /></header>
                        <p className="p-1"><Skeleton count={1} /></p>
                    </article>
                )
            )
        }
        </>
      );
}