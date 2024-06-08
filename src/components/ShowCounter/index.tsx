import React from 'react'
import { useTableStore } from '../../utils/store'

export default function ShowCounter() {
  const currentPage = useTableStore((state) => state.currentPage)
  const maxEntries = useTableStore((state) => state.foundRows.length)
  const displayedEntries = useTableStore((state) => state.displayedRows.length)
  const displayCount = useTableStore((state) => state.displayCount)
  const first = 1 + displayCount * (currentPage - 1)
  const last = displayedEntries + displayCount * (currentPage - 1)

  return (
    <div className="tableViewer__showCounter">
      Showing {first} to {last} of {maxEntries} entries
    </div>
  )
}
