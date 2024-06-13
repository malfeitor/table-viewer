import React from 'react'
import { TableStoreType, useTableStore } from '../../utils/store'
import { Form } from 'react-bootstrap'

export default function Quantity() {
  const setDisplayRows = useTableStore(
    (state: TableStoreType) => state.setDisplayCount
  )
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)
  const handleSelect = (quantity: number) => {
    setDisplayRows(quantity)
    updateDisplayRows()
  }
  return (
    <Form.Group className="tableViewer__quantity d-flex align-items-center">
      <span>Show</span>
      <Form.Select
        onChange={(e) => handleSelect(parseInt(e.target.value))}
        size="sm"
        className="mx-1"
        aria-label="Select how many entries are displayed"
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Select>
      <span>entries</span>
    </Form.Group>
  )
}
