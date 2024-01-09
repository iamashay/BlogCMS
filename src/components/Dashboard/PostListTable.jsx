'use client'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor('title', {
        cell: info => info.getValue(),
        header: () => <span>Title</span>,
    }),
    columnHelper.accessor('author.username', {
        cell: info =>  info.getValue(),
        header: () => <span>Username</span>,
    }),
    columnHelper.accessor('createdAt', {
        header: () => 'Posted At',
        cell: info => info.renderValue().toString(),
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
]



export default function PostListTable({defaultData}) {
    const [data, setData] = useState(() => [...defaultData])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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