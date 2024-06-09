import React from 'react'
import { useTableStore } from '../../utils/store'

export default function TableHead() {
  const headRow = useTableStore((state) => state.headRow)
  return (
    <thead>
      <tr>
        {headRow.map((column: string, index: number) => (
          <th key={`table-header-${index}`}>{column}</th>
        ))}
      </tr>
    </thead>
  )
}
