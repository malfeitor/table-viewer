import React, { ChangeEvent } from 'react'
import { useTableStore } from '../../utils/store'

export default function TableSearch() {
  const search = useTableStore((state) => state.setSearch)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)
  const onChange = (e: ChangeEvent) => {
    search((e.target as HTMLInputElement).value)
    updateDisplayRows()
  }

  return (
    <span className="tableViewer__header--search">
      Search : <input type="text" onChange={onChange} />
    </span>
  )
}
