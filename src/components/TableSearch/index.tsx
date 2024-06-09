import React, { ChangeEvent } from 'react'
import { useTableStore } from '../../utils/store'

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
    <span className="tableViewer__search">
      Search : <input type="text" onChange={onChange} />
    </span>
  )
}
