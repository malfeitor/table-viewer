type ObjectRowType = Record<string, string | number>
type ArrayRowType = Array<string | number>

export type TableViewerProps = {
  rows: Array<ObjectRowType | ArrayRowType>
  className?: string
}

export function isObjectRowType(
  row: Array<ObjectRowType | ArrayRowType>
): row is ObjectRowType[] {
  return row[0].length === undefined
}
