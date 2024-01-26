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

const deleteComment = async ({id, deleteCommentRow}) => {
  try {
    const loadingMsg = toast.loading("Deleting comment...")
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
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
    toast.success("Comment successfully deleted!")
    deleteCommentRow(id)
  }catch(e) {
    toast.error('Error: '+e)
  }
}

const RowAction = ({href, id, deleteCommentRow}) => {
    const [popup, setPopup] = useState(false)
    
    return (
        <span className='flex gap-4'>
            <Link href={href}><EditPostIcon title={'Edit the comment'}/></Link>
            <div onClick={() => setPopup(!popup)} className='cursor-pointer'><DeletePostIcon title={'Delete the comment'}/></div>
            {
              popup && <PopUp onClick={() => deleteComment({id, deleteCommentRow})} />
            }
        </span>
    )
}


export default function CommentListTable({defaultData}) {
    const [data, setData] = useState(() => [...defaultData])
    const [rowSelection, setRowSelection] = useState({})

    const deleteCommentRow = (id) => {
      setData((data) => data.filter((row) => row.id !== id))
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
            cell: info => <Link href={"comment/edit/"+info.row.original.id}>{createSummary(info.getValue(), 100)}</Link>,
            header: () => <span>Body</span>,
        }),
        columnHelper.accessor('guestName', {
            cell: info =>  info.getValue(),
            header: () => <span>Name</span>,
        }),
        columnHelper.accessor('email', {
          cell: info =>  info.getValue(),
          header: () => <span>Email</span>,
        }),
        columnHelper.accessor('createdAt', {
            header: () => 'Posted At',
            cell: info => info.renderValue().toLocaleDateString("en-IN", {day: 'numeric', month: 'short', year: 'numeric'}),
        }),
        columnHelper.display({
            id: 'actions',
            cell: info => <RowAction href={"/dashboard/comment/edit/"+info.row.original.id} id={info.row.original.id} deleteCommentRow={deleteCommentRow}/>,
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