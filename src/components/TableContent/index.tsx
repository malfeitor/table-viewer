import React from 'react'
import { Table } from 'react-bootstrap'
import { useTableStore } from '../../utils/store'

export default function TableContent() {
  const headRow = useTableStore((state) => state.headRow)
  const tableRows = useTableStore((state) => state.displayedRows)
  return (
    <Table className={`tableViewer__table`} striped bordered hover>
      <thead>
        <tr>
          {headRow.map((column: string, index: number) => (
            <th key={`table-header-${index}`}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row: Array<string>, rowIndex: number) => (
          <tr key={`table-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td key={`table-${rowIndex}-${cellIndex}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
