import React from 'react'
import { useTableStore } from '../../utils/store'

export default function ShowCounter() {
  const maxEntries = useTableStore((state) => state.foundRows.length)
  const displayedEntries = useTableStore((state) => state.displayedRows.length)
  return (
    <p>
      Showing 1 to {displayedEntries} of {maxEntries} entries
    </p>
  )
}
