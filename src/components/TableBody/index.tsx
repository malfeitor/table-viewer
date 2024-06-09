import React from 'react'
import { useTableStore } from '../../utils/store'

export default function TableBody() {
  const displayedRowsIndex = useTableStore((state) => state.displayedRows)
  const tableRowData = useTableStore((state) => state.tableRows)
  return (
    <tbody>
      {displayedRowsIndex.map((row) => (
        <tr key={`table-${row}`}>
          {tableRowData[row].map((cell, cellIndex) => (
            <td key={`table-${row}-${cellIndex}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
