'use client'

import {FilterFn, SortingFn, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, sortingFns, useReactTable, getFacetedUniqueValues, ColumnDef,} from "@tanstack/react-table"
import { CustomerRespDTO } from "../Customers/CustomersListFromFranchise"
import { Button,Flex, Group, Input, Pagination, Select, Space, Stack, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import {
    RankingInfo,
    compareItems,
    rankItem,
  } from '@tanstack/match-sorter-utils'
import FilterColumns from "../FilterColumns";
import exportFile from "../ExportFile";
import EditCell from "../EditCell";
import TableCell from "../TableCell";



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
    const [updateD, setupdateD] = useState({});

    // const itemsPerPage = 10;
    // const currPageData = customers.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    // const total = Math.ceil(customers.length / itemsPerPage);

    const [globalFilter, setGlobalFilter] = useState('');
    const [data, setData] = useState(() => [...customers]);
    const [originalData, setOriginalData] = useState(() => [...customers]);
    const [editedRows, setEditedRows] = useState({});


    // const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    //     let dir = 0
      
    //     // Only sort by rank if the column has ranking information
    //     if (rowA.columnFiltersMeta[columnId]) {
    //       dir = compareItems(
    //         rowA.columnFiltersMeta[columnId]?.itemRank!,
    //         rowB.columnFiltersMeta[columnId]?.itemRank!
    //       )
    //     }
      
    //     // Provide an alphanumeric fallback for when the item ranks are equal
    //     return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
    //   }
    useEffect(()=>{
      setData(customers);
    },[customers])

    const defaultColumns = [
        columnHelper.accessor('idd',{
            header: 'Customer Id',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('erp_customer_code',{
            header: 'ERP Code',    
            // cell: info => info.getValue()  
            // sortingFn: fuzzySort
        }),
        columnHelper.accessor('name',{
            header: 'Customer Name',
            // cell: TableCell                 
            // sortingFn: fuzzySort
        }),
        columnHelper.accessor('completed_job',{
            header: 'Job completed',
            cell: TableCell
            // info => <><Checkbox defaultChecked ={info.getValue()}></Checkbox></>
        }),
        columnHelper.accessor('scheduled_job',{
          header: 'Job scheduled',
          cell: TableCell
          // info => <><Checkbox defaultChecked ={info.getValue()}></Checkbox></>
        }),
        columnHelper.accessor('fitter_app_send_automatic_notification',{
            header: 'Send automatic notification',
            cell: TableCell
            // info => <><Checkbox defaultChecked ={info.getValue()}></Checkbox></>
        }),
        columnHelper.accessor('fitter_app_send_manual_notification',{
            header: 'Send manual notification',
            cell: TableCell
            // info => <><Checkbox defaultChecked ={info.getValue()}></Checkbox></>
        }),
        columnHelper.accessor('send_email_to_delivery_site_contact',{
          header: 'Send email to delivery site contact',
          cell: TableCell
          // info => <><Checkbox defaultChecked ={info.getValue()}></Checkbox></>
        }),
        // columnHelper.display({
        //     id: 'close',
        //     cell: info =>  EditCell,
        // }),
        columnHelper.display({
            id: 'edit',
            cell: EditCell,
        }),
    ]
 
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value)
        console.log(itemRank);
        // Store the itemRank info
        addMeta({
          itemRank,
        })
      
        // Return if the item should be filtered in/out
        return itemRank.passed
    }

    const table = useReactTable({
        data: data,
        columns: defaultColumns,
        // defaultColumn:updatedTableCell,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            
            globalFilter,
        },
        meta: {
            editedRows,
            setEditedRows,
            updateD,
            revertData: (rowIndex: number, revert: boolean) => {
              if (revert) {
                setData((old) =>
                  old.map((row, index) =>
                    index === rowIndex ? originalData[rowIndex] : row
                  )
                );
              } else {
                setOriginalData((old) =>
                  old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
                );
              }
            },
            updateData: (rowIndex: number, columnId: string, value: string) : any =>  {
              setData((old) => old.map((row, index) => {
                if (index === rowIndex) {
                  console.log('updated values:',{...old[rowIndex]!,[columnId]: value});                 
                  setupdateD({...old[rowIndex]!,[columnId]: value});
                  return {
                    ...old[rowIndex]!,
                    [columnId]: value,
                  };
                }else
                return row;
              })
              
              );
              return updateD;
            },       
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,              
        getCoreRowModel: getCoreRowModel<CustomerRespDTO>(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        
    });

    

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
                        {header.column.getCanFilter() ? (
                          <>
                            <FilterColumns column={header.column} table={table} />
                          </>
                        ) : null}
                        
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
    
  return (
    <>
        <Stack
         h={300}
         bg="var(--mantine-color-body)"
         align="center"         
        >
            <Flex
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <Input value={globalFilter ?? ''} onChange={e => setGlobalFilter(String(e.target.value))} placeholder="Search all columns..." ></Input>
                <Button variant="light" onClick={() => exportFile(table,'Filtered result')}> DownLoad Excel file</Button>
            </Flex>
            

            <Table striped  withRowBorders={true} captionSide="bottom">
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

                    <Title order={6}>Count : {table.getFilteredRowModel().rows.length > 0 ? table.getFilteredRowModel().rows.length : table.getCoreRowModel().rows.length} of {table.getCoreRowModel().rows.length} </Title>
                    <Space />

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




