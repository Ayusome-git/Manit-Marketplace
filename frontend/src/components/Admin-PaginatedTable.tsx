import { useState } from "react"
import {
 Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

import {
 Pagination, PaginationContent, PaginationItem,
 PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination"


type PaginatedTableProps<T> = {
 data: T[]
 columns: { key: keyof T | string; label: string }[]
 rowsPerPageOptions?: number[]
 renderRow: (item: T) => React.ReactNode[]
 title?: string
}

export function PaginatedTable<T>({
 data,
 columns,
 rowsPerPageOptions = [5, 7, 10],
 renderRow,
 title,
}: PaginatedTableProps<T>) {

 const [currentPage, setCurrentPage] = useState(1)
 const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])

 const totalPages = Math.ceil(data.length / rowsPerPage)
 const startIndex = (currentPage - 1) * rowsPerPage
 const endIndex = startIndex + rowsPerPage
 const currentRows = data.slice(startIndex, endIndex)

 const handleNext = () => {
  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
 }

 const handlePrevious = () => {
  if (currentPage > 1) setCurrentPage((prev) => prev - 1)
 }

 const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setRowsPerPage(Number(e.target.value))
  setCurrentPage(1)
 }

 return (
  <div className="space-y-4">
   {/* Header */}
   <div className="flex justify-between items-center">
    {title &&
     <h2 className="text-lg font-semibold">{title}</h2>
    }
    <div className="flex items-center gap-2">
     <label htmlFor="rowsPerPage" className="text-sm text-gray-600">
      Rows per page:
     </label>
     <select
      id="rowsPerPage"
      value={rowsPerPage}
      onChange={handleRowsPerPageChange}
      className="border rounded-md px-2 py-1 text-sm"
     >
      {rowsPerPageOptions.map((opt) => (
       <option key={opt} value={opt}>
        {opt}
       </option>
      ))}
     </select>
    </div>
   </div>

   {/* Table */}
   <Table className="p-4">
    <TableHeader>
     <TableRow className="space-y-2">
      {columns.map((col) => (
       <TableHead className="text-center px-4 py-3 font-medium" key={String(col.key)}>
        {col.label}
       </TableHead>
      ))}
     </TableRow>
    </TableHeader>

    <TableBody className="">
     {currentRows.length > 0 ? (
      currentRows.map((item, index) => (
       renderRow(item)
      ))
     ) : (
      <TableRow>
       <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
        No data available
       </TableCell>
      </TableRow>
     )}
    </TableBody>
   </Table>

   {/* Pagination */}
   <Pagination>
    <PaginationContent>
     <PaginationItem>
      <PaginationPrevious
       href="#"
       onClick={handlePrevious}
       className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      />
     </PaginationItem>

     {[...Array(totalPages)].map((_, i) => (
      <PaginationItem key={i}>
       <PaginationLink
        href="#"
        onClick={() => setCurrentPage(i + 1)}
        isActive={currentPage === i + 1}
       >
        {i + 1}
       </PaginationLink>
      </PaginationItem>
     ))}

     <PaginationItem>
      <PaginationNext
       href="#"
       onClick={handleNext}
       className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
      />
     </PaginationItem>
    </PaginationContent>
   </Pagination>
  </div>
 )
}
