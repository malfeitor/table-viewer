import React from 'react'
import { Button } from 'react-bootstrap'
import { useTableStore } from '../../utils/store'

export default function PagesJumper() {
  const currentPage = useTableStore((state) => state.currentPage)
  const setPage = useTableStore((state) => state.setPage)
  const setPreviousPage = useTableStore((state) => state.setPreviousPage)
  const setNextPage = useTableStore((state) => state.setNextPage)
  const updateDisplayRows = useTableStore((state) => state.updateDisplayRows)

  const maxPages = useTableStore((state) =>
    Math.ceil(state.foundRows.length / state.displayCount)
  )

  const handleClick = (page: number) => {
    setPage(page)
    updateDisplayRows()
  }

  const handlePrevious = () => {
    setPreviousPage()
    updateDisplayRows()
  }

  const handleNext = () => {
    setNextPage()
    updateDisplayRows()
  }

  return (
    <div>
      <Button disabled={currentPage === 1} onClick={handlePrevious}>
        Previous
      </Button>
      {maxPages > 0 &&
        [...Array(maxPages)].map((_, index) => {
          const page = index + 1
          return (
            <Button
              disabled={currentPage === page}
              onClick={() => handleClick(page)}
              key={`page-${page}`}
            >
              {page}
            </Button>
          )
        })}
      <Button disabled={currentPage === maxPages} onClick={handleNext}>
        Next
      </Button>
    </div>
  )
}
