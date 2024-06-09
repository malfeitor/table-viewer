import React from 'react'
import { Table } from 'react-bootstrap'
import TableHead from '../../components/TableHead'
import TableBody from '../../components/TableBody'

export default function TableContent() {
  return (
    <Table className={`tableViewer__table`} striped bordered hover>
      <TableHead />
      <TableBody />
    </Table>
  )
}
