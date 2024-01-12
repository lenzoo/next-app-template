
import { Container, Loader, LoadingOverlay } from "@mantine/core";
import FranchiseSelect from "./FranchiseSelect";


export type ListFranchise = {
    franchise_id : number,
    name: string,
    domain: string,
    isCalendar_first_day: boolean

}

async function getData() {
    const res = await fetch('http://localhost:5120/GetAllFranchises')    
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    const result : ListFranchise[] = await res.json();
    console.log(result);
     return result;
  
}
const FranchisesList = async  () => {
    const data : ListFranchise[] = await getData();
  return (      
    <>   
      {data.length == 0 ? <LoadingOverlay visible = {true} /> :
        <Container size="xs">        
          <FranchiseSelect franchises={data} />
        </Container> 
      }  
          
       {/* <FranchiseTable franchises={data} /> */}
    </>
  )
}

export default FranchisesList