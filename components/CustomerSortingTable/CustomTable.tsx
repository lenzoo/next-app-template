'use client'


import {FilterFn, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { CustomerRespDTO } from "../Customers/CustomersListFromFranchise"
import { Checkbox, Group, Input, Pagination, Select, Space, Stack, Table } from "@mantine/core";
import { useState } from "react";
import {
    RankingInfo,
    rankItem,
  } from '@tanstack/match-sorter-utils'

  declare module '@tanstack/table-core' {
    interface FilterFns {
      fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
      itemRank: RankingInfo
    }
  }

const CustomTable = ({customers } : {customers :CustomerRespDTO[]} ) => {

    const columnHelper = createColumnHelper<CustomerRespDTO>();
    // const [activePage, setPage] = useState(1);

    // const itemsPerPage = 10;
    // const currPageData = customers.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    // const total = Math.ceil(customers.length / itemsPerPage);

    const [globalFilter, setGlobalFilter] = useState('');

    
    const defaultColumns = [
        columnHelper.accessor('idd',{
            header: 'Customer Id'
        }),
        columnHelper.accessor('erp_customer_code',{
            header: 'ERP Code'
        }),
        columnHelper.accessor('name',{
            header: 'Customer Name'
        }),
        columnHelper.accessor('completed_job',{
            header: 'Job completed',
            cell: info => <><Checkbox checked ={info.getValue()}></Checkbox></>
        }),
    ]

    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value)
      
        // Store the itemRank info
        addMeta({
          itemRank,
        })
      
        // Return if the item should be filtered in/out
        return itemRank.passed
    }

    const table = useReactTable({
        data: customers,
        columns: defaultColumns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            globalFilter,
        },


        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,              
        getCoreRowModel: getCoreRowModel<CustomerRespDTO>(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    // const activePageVal = <>{table.getState().pagination.pageIndex + 1} of{' '} {table.getPageCount()}</>

    const ths = 
      <>
        {table.getHeaderGroups().map(hg => (
            <Table.Tr key={hg.id}>
                {hg.headers.map(header =>(
                    <Table.Th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                            <div
                                {...{
                                className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : '',
                                onClick: header.column.getToggleSortingHandler(),
                                }}
                            >
                                {flexRender(header.column.columnDef.header,header.getContext())}
                                {{ asc: ' 🔼', desc: ' 🔽',}
                                [header.column.getIsSorted() as string] ?? null}
                            </div>
                        )}
                        
                    </Table.Th>
                ))}               
            </Table.Tr>
        ))}
      </>       
    

    const rows = 
    <>
        {
            table.getRowModel().rows.map(row => (

                <Table.Tr key = {row.id}>
                    {row.getVisibleCells().map(cell =>(
                        <Table.Td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell,cell.getContext())}                           
                        </Table.Td>
                    ))}
                </Table.Tr>
            ))
        }
        
    </>
    
    console.log("check test 1",table.getRowModel().rows.filter(x => x._getAllVisibleCells().filter(c => c.getContext().getValue)));
  return (
    <>
        <Stack
         h={300}
         bg="var(--mantine-color-body)"
         align="center"
         
        >
            <Input value={globalFilter ?? ''} onChange={e => setGlobalFilter(String(e.target.value))} placeholder="Search all columns..." ></Input>

            <Table striped stickyHeader withRowBorders={true} captionSide="bottom">
                {customers.length == 0 ?<Table.Caption>No customers found for the selected franchsie</Table.Caption> : 
                <> 
                <Space h="xl" />
                    <Table.Thead>{ths}</Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </>
                }
            </Table >
            
            <Pagination.Root total={table.getPageCount()} value={table.getState().pagination.pageIndex + 1} onChange={e => {table.setPageIndex(e)}}>
                <Group justify="center">
                    <Pagination.First  onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} />
                    <Pagination.Previous onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}/>
                    <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}/>
                    <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}/>
                    <Select 
                        data={['10', '20', '30', '40', '50']} 
                        value={(table.getState().pagination.pageSize).toString()} 
                        onChange={e => {table.setPageSize(Number(e))}} 
                    />
                </Group>
            </Pagination.Root>
        </Stack>
        
    </>
    
  )
}

export default CustomTable

