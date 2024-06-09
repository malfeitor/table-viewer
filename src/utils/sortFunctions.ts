export function sortString(a: string, b: string) {
  if (a.toLowerCase() < b.toLowerCase()) return -1
  if (a.toLowerCase() > b.toLowerCase()) return 1
  return 0
}

export function sortDecorator(
  sortFunction: (a: any, b: any) => number,
  columnIndex: number
) {
  return (a: any, b: any) => sortFunction(a[columnIndex], b[columnIndex])
}
