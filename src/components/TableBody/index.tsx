import React from 'react'
import { useTableStore } from '../../utils/store'

export default function TableBody() {
  const tableRows = useTableStore((state) => state.displayedRows)
  return (
    <tbody>
      {tableRows.map((row: Array<string>, rowIndex: number) => (
        <tr key={`table-${rowIndex}`}>
          {row.map((cell, cellIndex) => (
            <td key={`table-${rowIndex}-${cellIndex}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
