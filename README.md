# React Table Viewer

An easy to use table viewer tool for react projects. \
It can get column names from rows prop if it's an Object. \
If you prefer to use rows as Arrays and no heads prop is specified, the first line must be columns names. \
It is written in TypeScript with Bootstrap and Zustand.

## How to use it

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [React](https://react.dev/)
- Install build version from [npm](https://www.npmjs.com/) with `npm install @malfeitor/table-viewer`
- OR clone this repo to get dev version with `git clone https://github.com/malfeitor/table-viewer.git`

### Instructions

1. Import to your project : `import {TableViewer} from '@malfeitor/table-viewer'`
1. Consume it : `<TableViewer rows={rows} />`

### Properties

- (required) `rows` : the table's rows you want to display, it can be an Object or an Array, if it's an array and no heads are specified, it will use the first line as table head.
- (optional) `heads` : the table's head row you want to display. It must be an Array.
- (optional) `sortFunctions` : the comparisons functions to sort table's rows with. It can be an Array or an Object. By default it's a string alphabetical comparison.

## Screenshots
