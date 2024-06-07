import React, { useEffect } from 'react'
import './index.scss'
import { TableViewerProps, isObjectRowType } from './utils/types'
import { Button } from 'react-bootstrap'
import { TableStoreType, useTableStore } from './utils/store'
import TableContent from './components/Table'

export const TableViewer = ({ rows }: TableViewerProps) => {
  const setDisplayRows = useTableStore(
    (state: TableStoreType) => state.setDisplayRows
  )
  const setHeadRow = useTableStore((state: TableStoreType) => state.setHeadRow)
  const setTableRows = useTableStore(
    (state: TableStoreType) => state.setTableRows
  )

  useEffect(() => {
    let tempHeadRow: string[] = []
    let tempTableRows = []

    if (isObjectRowType(rows)) {
      // get all uniques column identifiers
      tempHeadRow = [...new Set(rows.map((row) => Object.keys(row)).flat())]
      tempTableRows = rows.map((row) =>
        tempHeadRow.map((column) => row[column])
      )
    } else {
      // create a copy
      tempTableRows = JSON.parse(JSON.stringify(rows))
      tempHeadRow = tempTableRows.shift()
    }

    setHeadRow(tempHeadRow)
    setTableRows(tempTableRows)
  }, [])

  return (
    <div className="tableViewer">
      <div className="tableViewer__header d-flex justify-content-between">
        <span className="tableViewer__header--quantity">
          Show{' '}
          <select onChange={(e) => setDisplayRows(parseInt(e.target.value))}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{' '}
          entries
        </span>
        <span className="tableViewer__header--search">
          Search : <input type="text" />
        </span>
      </div>
      <TableContent />
      <div className="tableViewer__footer d-flex justify-content-between">
        <p>Showing 1 of 2 entries</p>
        <div>
          <Button>Previous</Button>
          <Button>1</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  )
}
