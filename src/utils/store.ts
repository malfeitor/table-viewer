import { create } from 'zustand'

export type TableStoreType = {
  displayRows: number
  currentPage: number
  headRow: string[]
  tableRows: string[][]
  setDisplayRows: (number: number) => void
  setHeadRow: (row: string[]) => void
  setTableRows: (rows: string[][]) => void
  setPage: (number: number) => void
  setPreviousPage: () => void
  setNextPage: () => void
}

export const useTableStore = create<TableStoreType>((set) => ({
  displayRows: 10,
  headRow: [],
  tableRows: [],
  currentPage: 0,
  setDisplayRows: (number: number) => set(() => ({ displayRows: number })),
  setHeadRow: (row: string[]) => set(() => ({ headRow: row })),
  setTableRows: (rows: string[][]) => set(() => ({ tableRows: rows })),
  setPage: (number: number) => set(() => ({ currentPage: number })),
  setPreviousPage: () =>
    set((state) => ({ currentPage: state.currentPage - 1 })),
  setNextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
}))
