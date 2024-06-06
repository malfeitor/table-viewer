import React from 'react'
import './index.scss'

type TableViewerProps = {
  rows: [
    {
      [key: string]: string | number
    }
  ]
}

export const TableViewer = ({ rows }: TableViewerProps) => {
  let headRow = []
  let tableRows = []
  // check if rows data is an Object
  if (rows[0].length === undefined) {
    headRow = Object.keys(rows[0])
    tableRows = rows.map((row) => Object.values(row))
  } else {
    tableRows = JSON.parse(JSON.stringify(rows[0]))
    headRow = tableRows.shift()
  }

  return (
    <table>
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
