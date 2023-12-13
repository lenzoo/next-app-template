
import {Container, Space, Text } from '@mantine/core';
import CustomerTable from './CustomerTable';
import { TableSort } from '../TableSort';
import CustomTable from '../CustomerSortingTable/CustomTable';



export type CustomerRespDTO = {

  idd: number,
  name : string,
  erp_customer_code : string,
  fitter_app_send_automatic_notification : boolean,
  fitter_app_send_manual_notification : boolean,
  scheduled_job : boolean,
  completed_job : boolean,
  send_email_to_delivery_site_contact : boolean

}

const CustomersListFromFranchise = async ({franchiseId}: {franchiseId : number}) => {

  // const encodedValue  = encodeURIComponent(franchiseId);
  // const convertToNUmber : number = +encodedValue;

  async function getData() {

    const res = await fetch(`http://localhost:5120/GetCustomersfromFranchise?franchiseId=${franchiseId}`)
    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    
      const result : CustomerRespDTO[]  = await res.json();
      console.log(result);
    return result;
  
  }

  const data : CustomerRespDTO[] =  await getData();
  return (
    <>        
      <Space h="xl" />
      {/* <CustomerTable customers={data} />    */}
      <CustomTable customers={data} />  
    </>
   
    
  )
}

export default CustomersListFromFranchise