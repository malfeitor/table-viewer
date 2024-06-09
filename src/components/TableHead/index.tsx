import React from 'react'
import { useTableStore } from '../../utils/store'

export default function TableHead() {
  const headRow = useTableStore((state) => state.headRow)
  const setSortColumnIndex = useTableStore((state) => state.setSortColumnIndex)
  const filterRows = useTableStore((state) => state.filterRows)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)

  const onClick = (index: number) => {
    setSortColumnIndex(index)
    filterRows()
    updateDisplayRows()
  }

  return (
    <thead>
      <tr>
        {headRow.map((column: string, index: number) => (
          <th key={`table-header-${index}`} onClick={() => onClick(index)}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}
