import { create } from 'zustand'

export type TableStoreType = {
  displayRows: number
  headRow: string[]
  tableRows: string[][]
  setDisplayRows: (number: number) => void
  setHeadRow: (row: string[]) => void
  setTableRows: (rows: string[][]) => void
}

export const useTableStore = create<TableStoreType>((set) => ({
  displayRows: 10,
  headRow: [],
  tableRows: [],
  setDisplayRows: (number: number) => set(() => ({ displayRows: number })),
  setHeadRow: (row: string[]) => set(() => ({ headRow: row })),
  setTableRows: (rows: string[][]) => set(() => ({ tableRows: rows })),
}))
