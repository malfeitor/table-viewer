import React from 'react'
import { TableStoreType, useTableStore } from '../../utils/store'

export default function Quantity() {
  const setDisplayRows = useTableStore(
    (state: TableStoreType) => state.setDisplayCount
  )
  return (
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
  )
}
