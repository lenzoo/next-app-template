'use client'



import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Space,
  Pagination,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';
import { CustomerRespDTO } from './Customers/CustomersListFromFranchise';

interface RowData {
  name: string;
  email: string;
  company: string;
}

interface ThProps {
  children?: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: CustomerRespDTO[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some(value => item[value]?.toString().toLowerCase().includes(query.toLowerCase()))
  );
}

function sortData(
  data: CustomerRespDTO[],
  payload: { sortBy: keyof CustomerRespDTO | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b)  => {
      if (payload.reversed) {
        return b[sortBy]?.toString().localeCompare((a[sortBy])!.toString());
      }

      return a[sortBy]?.toString().localeCompare((b[sortBy])!.toString());
    }),
    payload.search
  );
}


export function TableSort({customers } : {customers :CustomerRespDTO[]}) {

     // to paginate records
    const [activePage, setPage] = useState(1);
    const itemsPerPage = 10;
    const currPageData = customers.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    
    // to sort and filter    
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(currPageData);
    const [sortBy, setSortBy] = useState<keyof CustomerRespDTO | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    
    const total = Math.ceil(customers.length / itemsPerPage);
    const [dataFiltered, setdataFiltered] = useState<CustomerRespDTO[]>(currPageData);
    
  const setSorting = (field: keyof CustomerRespDTO) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(sortedData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    const filteredRows = sortedData.filter(row => Object.values(row).some(value => value.toString().toLowerCase().includes(event.target.value.toLowerCase())));
    // setdataFiltered(filteredRows);
    setSortedData(sortData(filteredRows, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.idd}>
      <Table.Td>{row.idd}</Table.Td> 
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.erp_customer_code}</Table.Td>
      {/* <Table.Td>{row.send_email_to_delivery_site_contact}</Table.Td> */}
    </Table.Tr>
  ));

  useEffect(() =>{
     
    setSortedData(currPageData);
    
  },[activePage, customers])

  return (
    <>
        <ScrollArea>
        <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<IconSearch style={{ width: rem(6), height: rem(6) }} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
        />
       
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
            <Table.Tbody>            
                <Table.Tr>
                    <Th
                    onSort={() => console.log()}                
                    >
                    Customer Id
                    </Th>
                    <Th
                    sorted={sortBy === 'name'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('name')}
                    >
                    Name
                    </Th>
                    <Th
                    sorted={sortBy === 'erp_customer_code'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('erp_customer_code')}
                    >
                    ERP Code
                    </Th>
                    {/* <Th
                    sorted={sortBy === 'company'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('company')}
                    >
                    Company
                    </Th> */}
                </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
            {rows.length > 0 ? (
                rows
            ) : (
                <Table.Tr>
                <Table.Td >
                    <Text fw={500} ta="center">
                    Nothing found
                    </Text>
                </Table.Td>
                </Table.Tr>
            )}
            </Table.Tbody>
        </Table>
        </ScrollArea>
        <Space h="xl" />
        <Pagination.Root total={total} value={activePage} onChange={setPage}>
            <Group gap={5} justify="center">
                <Pagination.First />
                <Pagination.Previous />
                <Pagination.Items  />
                <Pagination.Next />
                <Pagination.Last />
            </Group>
        </Pagination.Root>
    </>
    
  );
}