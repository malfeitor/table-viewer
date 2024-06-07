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
  currentPage: 0,
  setDisplayCount: (number: number) => set(() => ({ displayCount: number })),
  setHeadRow: (row: string[]) => set(() => ({ headRow: row })),
  setTableRows: (rows: string[][]) => set(() => ({ tableRows: rows })),
  setPage: (number: number) => set(() => ({ currentPage: number })),
  setPreviousPage: () =>
    set((state) => ({ currentPage: state.currentPage - 1 })),
  setNextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
}))
