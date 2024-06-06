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
  let headRow: string[] = []
  let tableRows = []
  // check if rows data is an Object
  if (rows[0].length === undefined) {
    // get all uniques column identifiers
    headRow = [...new Set(rows.map((row) => Object.keys(row)).flat())]
    tableRows = rows.map((row) => headRow.map((column) => row[column]))
  } else {
    tableRows = JSON.parse(JSON.stringify(rows))
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
