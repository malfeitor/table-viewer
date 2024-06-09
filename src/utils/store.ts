import { create } from 'zustand'
import { SortFunctionType } from './types'

export type TableStoreType = {
  displayCount: number
  currentPage: number
  headRow: string[]
  tableRows: string[][]
  foundRows: number[]
  displayedRows: number[]
  sortFunctions: SortFunctionType[]
  sortColumnIndex: number
  sortReversed: boolean
  sortedRows: number[]
  searchValue: string
  setDisplayCount: (number: number) => void
  setHeadRow: (row: string[]) => void
  setTableRows: (rows: string[][]) => void
  setPage: (number: number) => void
  setPreviousPage: () => void
  setNextPage: () => void
  setSearchValue: (str: string) => void
  updateDisplayRows: () => void
  setSortFunctions: (sortFunct: SortFunctionType[]) => void
  setSortColumnIndex: (index: number) => void
  setSortReversed: (value: boolean) => void
  filterRows: () => void
}

export const useTableStore = create<TableStoreType>((set) => ({
  displayCount: 10,
  headRow: [],
  tableRows: [],
  foundRows: [],
  displayedRows: [],
  currentPage: 1,
  sortFunctions: [],
  sortColumnIndex: 0,
  sortReversed: false,
  sortedRows: [],
  searchValue: '',

  setHeadRow: (row) => set(() => ({ headRow: row })),
  setTableRows: (rows) =>
    set(() => ({ tableRows: rows, foundRows: rows.map((_, index) => index) })),

  setDisplayCount: (number) =>
    set(() => ({ displayCount: number, currentPage: 1 })),

  setPage: (number) => set(() => ({ currentPage: number })),
  setPreviousPage: () =>
    set((state) => ({ currentPage: state.currentPage - 1 })),
  setNextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),

  setSearchValue: (str) => set(() => ({ searchValue: str })),
  filterRows: () =>
    set((state) => {
      const newFound = []
      for (let i = 0; i < state.tableRows.length; i++) {
        const row = state.tableRows[i]
        if (row.some((cell) => cell.toString().includes(state.searchValue))) {
          newFound.push(i)
        }
      }
      return { currentPage: 1, foundRows: newFound }
    }),

  updateDisplayRows: () =>
    set((state) => ({
      displayedRows: state.foundRows.filter(
        (_, index) =>
          index < state.displayCount * state.currentPage &&
          index >= state.displayCount * (state.currentPage - 1)
      ),
    })),

  setSortFunctions: (sortFunct) => set(() => ({ sortFunctions: sortFunct })),
  setSortColumnIndex: (index) => set(() => ({ sortColumnIndex: index })),
  setSortReversed: (value) => set(() => ({ sortReversed: value })),
}))
