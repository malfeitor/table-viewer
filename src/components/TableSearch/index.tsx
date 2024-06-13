import React, { ChangeEvent } from 'react'
import { useTableStore } from '../../utils/store'
import { Form, FormGroup } from 'react-bootstrap'

export default function TableSearch() {
  const setSearchValue = useTableStore((state) => state.setSearchValue)
  const filterRows = useTableStore((state) => state.filterRows)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)

  const onChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value)
    filterRows()
    updateDisplayRows()
  }

  return (
    <FormGroup className="tableViewer__search">
      <Form.Control type="text" onChange={onChange} placeholder="Filter :" />
    </FormGroup>
  )
}
