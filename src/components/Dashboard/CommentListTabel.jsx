'use client'
import Link from 'next/link'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState, useEffect, useRef } from 'react'
import { EditPostIcon, DeletePostIcon } from '../SVG'
import { PopUp } from '../Reusables/PopUp'
import {toast} from 'react-hot-toast'
import { createSummary } from '@/lib/CommentFunctions'
const columnHelper = createColumnHelper()


function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }) {
    const ref = useRef(null)
  
    useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate, rest])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
}

const deletePost = async ({id, slug, deletePostRow}) => {
  try {
    const loadingMsg = toast.loading("Deleting post...")
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id
      }),
      cache: 'no-cache'
    })
    toast.dismiss(loadingMsg)
    const body = await result.json()
    if (result.status !== 200) return toast.error(body.error)
    toast.success("Post successfully deleted!")
    deletePostRow(slug)
  }catch(e) {
    toast.error('Error: '+e)
  }
}

const RowAction = ({href, id, deletePostRow, slug}) => {
    const [popup, setPopup] = useState(false)
    
    return (
        <span className='flex gap-4'>
            <Link href={href}><EditPostIcon title={'Edit the post'}/></Link>
            <div onClick={() => setPopup(!popup)} className='cursor-pointer'><DeletePostIcon title={'Delete the post'}/></div>
            {
              popup && <PopUp onClick={() => deletePost({id, deletePostRow, slug})} />
            }
        </span>
    )
}


export default function CommentListTable({defaultData}) {
    const [data, setData] = useState(() => [...defaultData])
    const [rowSelection, setRowSelection] = useState({})

    const deletePostRow = (slug) => {
      setData((data) => data.filter((row) => row.slug !== slug))
    }

    const columns = useMemo( () => [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            ),
            cell: ({ row }) => (
              <div className="px-1">
                <IndeterminateCheckbox
                  {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              </div>
            ),
          }),
        columnHelper.accessor('body', {
            cell: info => <Link href={"post/edit/"+info.row.original.id}>{createSummary(info.getValue())}</Link>,
            header: () => <span>Title</span>,
        }),
        columnHelper.accessor('guestName', {
            cell: info =>  info.getValue(),
            header: () => <span>Username</span>,
        }),
        columnHelper.accessor('createdAt', {
            header: () => 'Posted At',
            cell: info => info.renderValue().toLocaleDateString("en-IN", {day: 'numeric', month: 'short', year: 'numeric'}),
        }),
        columnHelper.display({
            id: 'actions',
            cell: info => <RowAction href={"/dashboard/post/edit/"+info.row.original.id} id={info.row.original.id} slug={info.row.original.slug} deletePostRow={deletePostRow}/>,
          }),
    ], [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
    })

    return (
    <table className='w-full text-left'>
        <thead className='bg-gray-200 text-secondary-dark border-b border-gray-400'>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
                <th key={header.id} className='p-1'>
                {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                </th>
            ))}
            </tr>
        ))}
        </thead>
        <tbody className=''>
        {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='p-1'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
            </tr>
        ))}
        </tbody>
    </table>

    )
}