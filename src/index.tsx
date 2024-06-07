import React, { useEffect } from 'react'
import './index.scss'
import { TableViewerProps, isObjectRowType } from './utils/types'
import { Button } from 'react-bootstrap'
import { TableStoreType, useTableStore } from './utils/store'
import TableContent from './components/Table'
import Quantity from './components/Quantity'
import ShowCounter from './components/ShowCounter'

export const TableViewer = ({ rows }: TableViewerProps) => {
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
        <Quantity />
        <span className="tableViewer__header--search">
          Search : <input type="text" />
        </span>
      </div>
      <TableContent />
      <div className="tableViewer__footer d-flex justify-content-between">
        <ShowCounter />
        <div>
          <Button>Previous</Button>
          <Button>1</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  )
}
