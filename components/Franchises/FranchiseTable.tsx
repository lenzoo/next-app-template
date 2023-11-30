'use client'
import { Checkbox, Table } from "@mantine/core";
import { ListFranchise } from "./FranchisesList";






const FranchiseTable =  ({franchises } : {franchises :ListFranchise[]} )  => {

    const ths = (
        <Table.Tr>
          <Table.Th>Franchise Id</Table.Th>
          <Table.Th>Franchise name</Table.Th>
          <Table.Th>Domain</Table.Th>
          <Table.Th>Is calendar first day</Table.Th>
        </Table.Tr>
      );

    const rows  = franchises.map((res=>
        <Table.Tr key={res.franchise_id}>
          <Table.Td>{res.franchise_id}</Table.Td>
          <Table.Td>{res.name}</Table.Td>
          <Table.Td>{res.domain}</Table.Td>
          <Table.Td><Checkbox
                    checked = {res.isCalendar_first_day}
                    color="lime.4"
                    iconColor="dark.8"
                    size="md"
                    label="Bright lime checkbox"
    /></Table.Td>          
        </Table.Tr>
    ));

  return (
    <Table striped withRowBorders={false}>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        
    </Table >
  )
}

export default FranchiseTable