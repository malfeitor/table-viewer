import React from 'react'
import { useTableStore } from '../../utils/store'
import { FaSortUp, FaSortDown } from 'react-icons/fa'

export default function TableHead() {
  const headRow = useTableStore((state) => state.headRow)
  const setSortColumnIndex = useTableStore((state) => state.setSortColumnIndex)
  const filterRows = useTableStore((state) => state.filterRows)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)
  const setSortReversed = useTableStore((state) => state.setSortReversed)
  const isSortReversed = useTableStore((state) => state.isSortReversed)
  const sortColumnIndex = useTableStore((state) => state.sortColumnIndex)

  const arrowUpActiveColor = (index: number) =>
    isSortReversed && index === sortColumnIndex ? '000' : 'AAA'
  const arrowDownActiveColor = (index: number) =>
    !isSortReversed && index === sortColumnIndex ? '000' : 'AAA'

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
            {column}{' '}
            <FaSortUp
              style={{ position: 'absolute', color: arrowUpActiveColor(index) }}
            />
            <FaSortDown style={{ color: arrowDownActiveColor(index) }} />
          </th>
        ))}
      </tr>
    </thead>
  )
}
