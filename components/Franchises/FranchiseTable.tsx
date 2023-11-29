'use client'
import { Checkbox, Table } from "@mantine/core";

export type ListFranchise = {
    franchise_id : number,
    name: string,
    domain: string,
    isCalendar_first_day: boolean

}


async function getData() {
    const res = await fetch('http://localhost:5154/api/Franchise/GetAllFranchises')
        
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    const result : ListFranchise[] = await res.json();
    console.log(result);
     return result;

     
}

const FranchiseTable = async () => {

    const ths = (
        <Table.Tr>
          <Table.Th>Franchise Id</Table.Th>
          <Table.Th>Franchise name</Table.Th>
          <Table.Th>Domain</Table.Th>
          <Table.Th>Is calendar first day</Table.Th>
        </Table.Tr>
      );

    const rows  = (await getData()).map((res=>
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