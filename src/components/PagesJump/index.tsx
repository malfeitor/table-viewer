import React from 'react'
import { Button } from 'react-bootstrap'
import { useTableStore } from '../../utils/store'

export default function PagesJumper() {
  const currentPage = useTableStore((state) => state.currentPage)
  const setPage = useTableStore((state) => state.setPage)
  const setPreviousPage = useTableStore((state) => state.setPreviousPage)
  const setNextPage = useTableStore((state) => state.setNextPage)

  const maxPages = useTableStore((state) =>
    Math.ceil(state.tableRows.length / state.displayCount)
  )
  return (
    <div>
      <Button disabled={currentPage === 1} onClick={setPreviousPage}>
        Previous
      </Button>
      {maxPages > 0 &&
        [...Array(maxPages)].map((_, index) => {
          const page = index + 1
          return (
            <Button
              disabled={currentPage === page}
              onClick={() => setPage(page)}
              key={`page-${page}`}
            >
              {page}
            </Button>
          )
        })}
      <Button disabled={currentPage === maxPages} onClick={setNextPage}>
        Next
      </Button>
    </div>
  )
}
