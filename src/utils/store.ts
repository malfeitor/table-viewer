import { create } from 'zustand'

export type TableStoreType = {
  displayCount: number
  currentPage: number
  headRow: string[]
  tableRows: string[][]
  foundRows: string[][]
  displayedRows: string[][]
  search: string
  setDisplayCount: (number: number) => void
  setHeadRow: (row: string[]) => void
  setTableRows: (rows: string[][]) => void
  setPage: (number: number) => void
  setPreviousPage: () => void
  setNextPage: () => void
  setSearch: (str: string) => void
  updateDisplayRows: () => void
}

export const useTableStore = create<TableStoreType>((set) => ({
  displayCount: 10,
  headRow: [],
  tableRows: [],
  foundRows: [],
  displayedRows: [],
  currentPage: 1,
  search: '',

  setHeadRow: (row: string[]) => set(() => ({ headRow: row })),

  setTableRows: (rows: string[][]) =>
    set(() => ({ tableRows: rows, foundRows: rows })),

  setDisplayCount: (number: number) =>
    set(() => ({ displayCount: number, currentPage: 1 })),

  setPage: (number: number) => set(() => ({ currentPage: number })),

  setPreviousPage: () =>
    set((state) => ({ currentPage: state.currentPage - 1 })),

  setNextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),

  setSearch: (str: string) =>
    set((state) => ({
      foundRows: state.tableRows.filter((row) =>
        row.some((cell) => cell.includes(str))
      ),
    })),

  updateDisplayRows: () =>
    set((state) => ({
      displayedRows: state.foundRows.filter(
        (_, index) =>
          index < state.displayCount * state.currentPage &&
          index >= state.displayCount * (state.currentPage - 1)
      ),
    })),
}))
