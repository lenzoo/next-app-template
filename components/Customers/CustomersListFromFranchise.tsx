

export type CustomerRespDTO = {

  Idd: number,
  Name : string,
  Erp_customer_code : string,
  Fitter_app_send_automatic_notification? : boolean,
  Fitter_app_send_manual_notification? : boolean,
  Scheduled_job? : boolean,
  Completed_job? : boolean,
  Send_email_to_delivery_site_contact? : boolean

}

const CustomersListFromFranchise = ({franchiseId}: {franchiseId : number}) => {

  // const encodedValue  = encodeURIComponent(franchiseId);
  // const convertToNUmber : number = +encodedValue;

  
  
  async function getData() {
    debugger;
    let fran = franchiseId.toString()
    const res = await fetch(`http://localhost:5120/GetCustomersfromFranchise?franchiseId=${franchiseId}`)
    
    // let url = new URL('http://localhost:5120/GetCustomersfromFranchise');
    // let params = { franchise: '123'};
    // url.searchParams.append(params.franchise,franchise.toString());

    // const res1 = await fetch(url);
    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
     const result  = await res.json();
      console.log(result);
    return result;
  
  }


  return (
    
    <>
    <div>CustomersTable : {franchiseId} </div>
    <div>Customer List  : {getData()} </div>
    </>
    
  )
}

export default CustomersListFromFranchise