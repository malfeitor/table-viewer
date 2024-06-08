import React from 'react'
import { useTableStore } from '../../utils/store'

export default function ShowCounter() {
  const currentPage = useTableStore((state) => state.currentPage)
  const maxEntries = useTableStore((state) => state.foundRows.length)
  const displayedEntries = useTableStore((state) => state.displayedRows.length)
  const displayCount = useTableStore((state) => state.displayCount)
  return (
    <p>
      Showing {1 + displayCount * (currentPage - 1)} to{' '}
      {displayedEntries + displayCount * (currentPage - 1)} of {maxEntries}{' '}
      entries
    </p>
  )
}
