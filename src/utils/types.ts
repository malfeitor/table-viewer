type ObjectRowType = Record<string, string>
type ArrayRowType = Array<string>

export type TableViewerProps = {
  rows: Array<ObjectRowType | ArrayRowType>
  className?: string
}

export function isObjectRowType(
  row: Array<ObjectRowType | ArrayRowType>
): row is ObjectRowType[] {
  return row[0].length === undefined
}
