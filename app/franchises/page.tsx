import CustomersListFromFranchise from '@/components/Customers/CustomersListFromFranchise'
import FranchisesList from '@/components/Franchises/FranchisesList'
import { LoadingOverlay, Space } from '@mantine/core'



const ListFranchises = ({searchParams} : {searchParams : any}) => {

  console.log(searchParams['franchiseId']);
  return (
    <>
    <Space h="xl" />
    <FranchisesList />
      {searchParams['franchiseId'] == null ? <LoadingOverlay /> :
        <CustomersListFromFranchise franchiseId ={searchParams['franchiseId']} />
      }
      
    </>
              
  )
}

export default ListFranchises