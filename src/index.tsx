import React from 'react'
import './index.scss'
import { TableViewerProps, isObjectRowType } from './utils/types'

export const TableViewer = ({ rows, className = '' }: TableViewerProps) => {
  let headRow: Array<string> = []
  let tableRows = []
  if (isObjectRowType(rows)) {
    // get all uniques column identifiers
    headRow = [...new Set(rows.map((row) => Object.keys(row)).flat())]
    tableRows = rows.map((row) => headRow.map((column) => row[column]))
  } else {
    // create a copy
    tableRows = JSON.parse(JSON.stringify(rows))
    headRow = tableRows.shift()
  }

  return (
    <table className={className}>
      <thead>
        <tr>
          {headRow.map((column: string | number, index: number) => (
            <th key={`table-header-${index}`}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row: Array<string | number>, rowIndex: number) => (
          <tr key={`table-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td key={`table-${rowIndex}-${cellIndex}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
