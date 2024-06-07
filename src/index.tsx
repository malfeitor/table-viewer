import React, { useEffect } from 'react'
import './index.scss'
import { TableViewerProps, isObjectRowType } from './utils/types'
import { useTableStore } from './utils/store'
import TableContent from './components/TableContent'
import Quantity from './components/Quantity'
import ShowCounter from './components/ShowCounter'
import PagesJump from './components/PagesJump'
import TableSearch from './components/TableSearch'

export const TableViewer = ({ rows }: TableViewerProps) => {
  const setDisplayCount = useTableStore((state) => state.setDisplayCount)
  const setHeadRow = useTableStore((state) => state.setHeadRow)
  const setTableRows = useTableStore((state) => state.setTableRows)

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
    setDisplayCount(10)
  }, [])

  return (
    <div className="tableViewer">
      <div className="tableViewer__header d-flex justify-content-between">
        <Quantity />
        <TableSearch />
      </div>
      <TableContent />
      <div className="tableViewer__footer d-flex justify-content-between">
        <ShowCounter />
        <PagesJump />
      </div>
    </div>
  )
}
