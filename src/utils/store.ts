import { create } from 'zustand'

export type TableStoreType = {
  displayCount: number
  currentPage: number
  headRow: string[]
  tableRows: string[][]
  foundRows: number[]
  displayedRows: string[][]
  setDisplayCount: (number: number) => void
  setHeadRow: (row: string[]) => void
  setTableRows: (rows: string[][]) => void
  setPage: (number: number) => void
  setPreviousPage: () => void
  setNextPage: () => void
  search: (str: string) => void
  updateDisplayRows: () => void
}

export const useTableStore = create<TableStoreType>((set) => ({
  displayCount: 10,
  headRow: [],
  tableRows: [],
  foundRows: [],
  displayedRows: [],
  currentPage: 1,

  setHeadRow: (row: string[]) => set(() => ({ headRow: row })),

  setTableRows: (rows: string[][]) =>
    set(() => ({ tableRows: rows, foundRows: rows.map((_, index) => index) })),

  setDisplayCount: (number: number) =>
    set(() => ({ displayCount: number, currentPage: 1 })),

  setPage: (number: number) => set(() => ({ currentPage: number })),

  setPreviousPage: () =>
    set((state) => ({ currentPage: state.currentPage - 1 })),

  setNextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),

  search: (str: string) =>
    set((state) => {
      const newFound = []
      for (let i = 0; i < state.tableRows.length; i++) {
        const row = state.tableRows[i]
        if (row.some((cell) => cell.includes(str))) {
          newFound.push(i)
        }
      }
      return { currentPage: 1, foundRows: newFound }
    }),

  updateDisplayRows: () =>
    set((state) => ({
      displayedRows: state.foundRows
        .filter(
          (_, index) =>
            index < state.displayCount * state.currentPage &&
            index >= state.displayCount * (state.currentPage - 1)
        )
        .map((index) => state.tableRows[index]),
    })),
}))
