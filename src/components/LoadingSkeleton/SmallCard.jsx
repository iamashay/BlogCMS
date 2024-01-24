import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export function SmallCardSkeleton({count}) {
    return (
        <>
        {
            Array.from({length: count})
                .map((_, index) => (
                 <div key={index}>
                    <section className='shadow-sm p-1 px-2 flex flex-col border border-gray-200 '>
                      <h2 className='text-md text-left'>{Skeleton({count: 1})}</h2>
                      <span className='text-5xl text-center p-6'>{value}</span>
                    </section>
                  </div>
                )
            )
        }
        </>
      );
}