import React, { useEffect } from 'react'
import './index.scss'
import {
  SortFunctionType,
  TableViewerProps,
  isArraySortFunctions,
  isObjectRowType,
  isObjectSortFunctions,
} from './utils/types'
import { useTableStore } from './utils/store'
import TableContent from './layouts/TableContent'
import Quantity from './components/Quantity'
import ShowCounter from './components/ShowCounter'
import PagesJump from './components/PagesJump'
import TableSearch from './components/TableSearch'
import { sortString, sortDecorator } from './utils/sortFunctions'

export const TableViewer = ({ rows, ...restProps }: TableViewerProps) => {
  const setHeadRow = useTableStore((state) => state.setHeadRow)
  const setTableRows = useTableStore((state) => state.setTableRows)
  const setSortFunctions = useTableStore((state) => state.setSortFunctions)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)

  useEffect(() => {
    let tempHeadRow: string[] = []
    let tempTableRows = []
    let tempSortFunctions: SortFunctionType[] = []
    const propSort = restProps?.sortFunctions
    const heads = restProps?.heads

    if (isObjectRowType(rows)) {
      // get all uniques column identifiers
      tempHeadRow = [...new Set(rows.map((row) => Object.keys(row)).flat())]
      tempTableRows = rows.map((row) =>
        tempHeadRow.map((column) => row[column])
      )
    } else {
      // create a copy
      tempTableRows = JSON.parse(JSON.stringify(rows))
      if (typeof heads === 'object') {
        tempHeadRow = [...heads]
      } else {
        tempHeadRow = tempTableRows.shift()
      }
    }

    if (isArraySortFunctions(propSort)) {
      tempSortFunctions = tempHeadRow.map((_, index) =>
        sortDecorator(
          typeof propSort[index] === 'function' ? propSort[index] : sortString,
          index
        )
      )
    } else if (isObjectSortFunctions(propSort)) {
      tempSortFunctions = tempHeadRow.map((column, index) =>
        sortDecorator(
          typeof propSort[column] === 'function'
            ? propSort[column]
            : sortString,
          index
        )
      )
    }

    setHeadRow(tempHeadRow)
    setTableRows(tempTableRows)
    setSortFunctions(tempSortFunctions)
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
