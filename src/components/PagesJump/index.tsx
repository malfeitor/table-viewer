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

  // if we have too much buttons to show, we display a group surrounding current page
  const BUTTON_QUANTITY = 5
  const BUTTON_SIBLINGS = 2
  const BUTTON_ELLIPSIS_CLASS = ''

  const minButtonPage = () => {
    if (currentPage < BUTTON_QUANTITY) {
      return BUTTON_SIBLINGS
    }
    if (currentPage + BUTTON_QUANTITY > maxPages) {
      return maxPages - BUTTON_QUANTITY + 1
    }
    return currentPage - BUTTON_SIBLINGS
  }

  const maxButtonPage = () => {
    // +2 because we count the first and last page button
    if (maxPages <= BUTTON_QUANTITY + 2) {
      return maxPages - 1
    }
    if (currentPage <= BUTTON_SIBLINGS) {
      return BUTTON_QUANTITY
    }
    if (currentPage + BUTTON_SIBLINGS >= maxPages) {
      return maxPages - 1
    }
    return currentPage + BUTTON_SIBLINGS
  }

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

  const showButtons = () => {
    let buttons = []
    if (currentPage >= BUTTON_QUANTITY) {
      buttons.push(
        <Button className={BUTTON_ELLIPSIS_CLASS} key="buttonEllipsis-0">
          ...
        </Button>
      )
    }
    for (let i = minButtonPage(); i <= maxButtonPage(); i++) {
      buttons.push(
        <Button
          disabled={currentPage === i}
          onClick={() => handleClick(i)}
          key={`i-${i}`}
        >
          {i}
        </Button>
      )
    }
    if (maxButtonPage() <= maxPages - BUTTON_SIBLINGS) {
      buttons.push(
        <Button className={BUTTON_ELLIPSIS_CLASS} key="buttonEllipsis-1">
          ...
        </Button>
      )
    }
    return buttons
  }

  return (
    <div className="tableViewer__pagesJump">
      <Button disabled={currentPage === 1} onClick={handlePrevious}>
        Previous
      </Button>
      {maxPages > 0 && (
        <>
          <Button
            disabled={currentPage === 1}
            onClick={() => handleClick(1)}
            key={`page-1`}
          >
            {1}
          </Button>
          {/* {cu} */}
          {showButtons()}
          <Button
            disabled={currentPage === maxPages}
            onClick={() => handleClick(maxPages)}
            key={`page-${maxPages}`}
          >
            {maxPages}
          </Button>
        </>
      )}
      <Button disabled={currentPage === maxPages} onClick={handleNext}>
        Next
      </Button>
    </div>
  )
}
