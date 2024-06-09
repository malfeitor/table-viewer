type ObjectRowType = Record<string, string>
type ArrayRowType = Array<string>
export type SortFunctionType = (a: any, b: any) => number

export type TableViewerProps = {
  rows: Array<ObjectRowType | ArrayRowType>
  sortFunctions?: Record<string, SortFunctionType> | Array<SortFunctionType>
  className?: string
}

export function isObjectRowType(
  row: Array<ObjectRowType | ArrayRowType>
): row is ObjectRowType[] {
  return row[0].length === undefined
}

export function isObjectSortFunctions(
  prop: Array<SortFunctionType> | Record<string, SortFunctionType> | undefined
): prop is Record<string, SortFunctionType> {
  return typeof prop === 'object' && prop.length === undefined
}

export function isArraySortFunctions(
  prop: Array<SortFunctionType> | Record<string, SortFunctionType> | undefined
): prop is Array<SortFunctionType> {
  return typeof prop === 'object' && prop.length !== undefined
}
