'use client'
import { Checkbox, Table } from "@mantine/core";
import { CustomerRespDTO } from "./CustomersListFromFranchise";


const CustomerTable =  ({customers } : {customers :CustomerRespDTO[]} )  => {

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

    const rows  = customers.map((res=>
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
                    
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.fitter_app_send_manual_notification}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.scheduled_job}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.completed_job}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    
            />
          </Table.Td>
          <Table.Td>
            <Checkbox
                    defaultChecked = {res.send_email_to_delivery_site_contact}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    
            />
          </Table.Td>          
        </Table.Tr>
    ));

  return (
    <Table striped withRowBorders={false}>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        
    </Table >
  )
}

export default CustomerTable