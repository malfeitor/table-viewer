import React from 'react'
import { Button } from 'react-bootstrap'
import { useTableStore } from '../../utils/store'

export default function PagesJumper() {
  const currentPage = useTableStore((state) => state.currentPage)
  const setPage = useTableStore((state) => state.setPage)
  const setPreviousPage = useTableStore((state) => state.setPreviousPage)
  const setNextPage = useTableStore((state) => state.setNextPage)
  return (
    <div>
      <Button disabled={currentPage === 0} onClick={setPreviousPage}>
        Previous
      </Button>
      {}
      <Button disabled={true} onClick={setNextPage}>
        Next
      </Button>
    </div>
  )
}
