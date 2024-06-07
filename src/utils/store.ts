import { create } from 'zustand'

export type TableStoreType = {
  displayCount: number
  currentPage: number
  headRow: string[]
  tableRows: string[][]
  displayedRows: string[][]
  setDisplayCount: (number: number) => void
  setHeadRow: (row: string[]) => void
  setTableRows: (rows: string[][]) => void
  setPage: (number: number) => void
  setPreviousPage: () => void
  setNextPage: () => void
}

export const useTableStore = create<TableStoreType>((set) => ({
  displayCount: 0,
  headRow: [],
  tableRows: [],
  displayedRows: [],
  currentPage: 1,
  setHeadRow: (row: string[]) => set(() => ({ headRow: row })),
  setTableRows: (rows: string[][]) => set(() => ({ tableRows: rows })),
  setDisplayCount: (number: number) =>
    set((state) => {
      return {
        displayCount: number,
        displayedRows: state.tableRows.filter(
          (_, index) => index < number * state.currentPage
        ),
        currentPage: 1,
      }
    }),
  setPage: (number: number) =>
    set((state) => ({
      currentPage: number,
      displayedRows: state.tableRows.filter(
        (_, index) =>
          index < state.displayCount * number &&
          index >= state.displayCount * (number - 1)
      ),
    })),
  setPreviousPage: () =>
    set((state) => {
      const newPage = state.currentPage - 1
      return {
        currentPage: newPage,
        displayedRows: state.tableRows.filter(
          (_, index) =>
            index < state.displayCount * newPage &&
            index >= state.displayCount * (newPage - 1)
        ),
      }
    }),
  setNextPage: () =>
    set((state) => {
      const newPage = state.currentPage + 1
      return {
        currentPage: newPage,
        displayedRows: state.tableRows.filter(
          (_, index) =>
            index < state.displayCount * newPage &&
            index >= state.displayCount * (newPage - 1)
        ),
      }
    }),
}))
