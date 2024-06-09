import React, { useEffect } from 'react'
import './index.scss'
import {
  TableViewerProps,
  isObjectRowType,
  isObjectSortFunctions,
} from './utils/types'
import { useTableStore } from './utils/store'
import TableContent from './layouts/TableContent'
import Quantity from './components/Quantity'
import ShowCounter from './components/ShowCounter'
import PagesJump from './components/PagesJump'
import TableSearch from './components/TableSearch'
import { sortString } from './utils/sortFunctions'

export const TableViewer = ({ rows, ...restProps }: TableViewerProps) => {
  const setHeadRow = useTableStore((state) => state.setHeadRow)
  const setTableRows = useTableStore((state) => state.setTableRows)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)

  useEffect(() => {
    let tempHeadRow: string[] = []
    let tempTableRows = []
    let tempSortFunctions = []

    if (isObjectRowType(rows)) {
      // get all uniques column identifiers
      tempHeadRow = [...new Set(rows.map((row) => Object.keys(row)).flat())]
      tempTableRows = rows.map((row) =>
        tempHeadRow.map((column) => row[column])
      )
      const propSort = restProps?.sortFunctions
      if (isObjectSortFunctions(propSort)) {
        tempSortFunctions = tempHeadRow.map((column) =>
          typeof propSort[column] === 'function' ? propSort[column] : sortString
        )
      }
    } else {
      // create a copy
      tempTableRows = JSON.parse(JSON.stringify(rows))
      tempHeadRow = tempTableRows.shift()
    }

    setHeadRow(tempHeadRow)
    setTableRows(tempTableRows)
    updateDisplayRows()
  }, [])

  return (
    <div className="tableViewer">
      <div className="tableViewer__header d-flex justify-content-between align-items-center mb-2">
        <Quantity />
        <TableSearch />
      </div>
      <TableContent />
      <div className="tableViewer__footer d-flex justify-content-between align-items-center">
        <ShowCounter />
        <PagesJump />
      </div>
    </div>
  )
}
