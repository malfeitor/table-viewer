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
    isSortReversed && index === sortColumnIndex ? '#000' : '#AAA'
  const arrowDownActiveColor = (index: number) =>
    !isSortReversed && index === sortColumnIndex ? '#000' : '#AAA'

  const onClick = (index: number) => {
    if (index === sortColumnIndex) {
      setSortReversed(!isSortReversed)
    } else {
      setSortReversed(false)
      setSortColumnIndex(index)
    }
    filterRows()
    updateDisplayRows()
  }

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    index: number
  ) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      onClick(index)
    }
  }

  return (
    <thead>
      <tr>
        {headRow.map((column: string, index: number) => (
          <th
            key={`table-header-${index}`}
            onClick={() => onClick(index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            tabIndex={0}
          >
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
