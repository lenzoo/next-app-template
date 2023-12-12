'use client'
import {ActionIcon, Center, Checkbox, Group, Pagination, Space, Table, TextInput, UnstyledButton, rem } from "@mantine/core";
import { CustomerRespDTO } from "./CustomersListFromFranchise";
import { useEffect, useState } from "react";
import { IconAlignLeft, IconArrowBarToDown, IconArrowBarToLeft, IconArrowBarToUp, IconChevronDown, IconChevronUp, IconSearch, IconSelector } from "@tabler/icons-react";


const CustomerTable =  ({customers } : {customers :CustomerRespDTO[]} )  => {

    const [activePage, setPage] = useState(1);
    const itemsPerPage = 10;
    const currPageData = customers.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const total = Math.ceil(customers.length / itemsPerPage);
    
    

    // const [currentPageData, setCurrentPage] = useState<CustomerRespDTO[]>(currPageData);

    // to sort and search table data //
    const [search, setSearch] = useState<any>();
    const [dataFiltered, setdataFiltered] = useState<CustomerRespDTO[]>(currPageData);
    const [sorted, setSorted] = useState(false);
    const[reversed, setReversed] = useState(false);
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearch(query);
      if (query.length > 0) {
        const filteredRows = currPageData.filter(row => Object.values(row).some(value => value.toString().toLowerCase().includes(query.toLowerCase())));
        setdataFiltered(filteredRows);
      } else {
        setdataFiltered(currPageData); // reset to the original data rows
      }
    };

    useEffect(() =>{
     
      setdataFiltered(currPageData);
      
    },[activePage, customers])

    const ths = (
      
        <Table.Tr>
          
          <Group> 
              <Table.Th>Customer Id </Table.Th>
              <Center>
                <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              </Center>
          </Group>
          
          <Table.Th>Name</Table.Th>
          <Table.Th>ERP Code</Table.Th>
          <Table.Th>Fitter app send automatic notification</Table.Th>
          <Table.Th>Fitter app send manual notification</Table.Th>
          <Table.Th>Scheduled job</Table.Th>
          <Table.Th>Completed job</Table.Th>
          <Table.Th>Send email to delivery site contact</Table.Th>
        </Table.Tr>
      );

    const rows  = dataFiltered.map((res=>
        <Table.Tr key={res.idd}>
          <Table.Td>{res.idd}</Table.Td>
          <Table.Td>{res.name}</Table.Td>
          <Table.Td>{res.erp_customer_code}</Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.fitter_app_send_automatic_notification}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    disabled                    
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.fitter_app_send_manual_notification}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    disabled                   
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.scheduled_job}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    disabled                    
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.completed_job}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    disabled                   
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.send_email_to_delivery_site_contact}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    disabled                
            />
          </Table.Td>          
        </Table.Tr>
    ));

  return (
    <>
      <Group justify="center">
          <TextInput
            placeholder="Search by any field"
            mb="md"
            size="sm"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            value={search}
            onChange={handleSearch}
          />
      </Group>
      
      <Table striped stickyHeader withRowBorders={false} captionSide="bottom">
        {customers.length == 0 ?<Table.Caption>No customers found for the selected franchsie</Table.Caption> : 
        <> 
          <Space h="xl" />
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </>
        }
               
      </Table >

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
    
  )
}

export default CustomerTable


