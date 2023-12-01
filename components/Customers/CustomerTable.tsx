'use client'
import { Checkbox, Group, Pagination, Table, TableData } from "@mantine/core";
import { CustomerRespDTO } from "./CustomersListFromFranchise";
import { useState } from "react";


const CustomerTable =  ({customers } : {customers :CustomerRespDTO[]} )  => {

    const [activePage, setPage] = useState(1);
    const itemsPerPage = 10;
    const currentPageData = customers.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const total = Math.ceil(customers.length / itemsPerPage);

    const ths = (
        <Table.Tr>
          <Table.Th>Customer Id</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>ERP Code</Table.Th>
          <Table.Th>Fitter app send automatic notification</Table.Th>
          <Table.Th>Fitter app send manual notification</Table.Th>
          <Table.Th>Scheduled job</Table.Th>
          <Table.Th>Completed job</Table.Th>
          <Table.Th>Send email to delivery site contact</Table.Th>
        </Table.Tr>
      );

    const rows  = currentPageData.map((res=>
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
        <Table striped stickyHeader withRowBorders={false}>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>       
        </Table >
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