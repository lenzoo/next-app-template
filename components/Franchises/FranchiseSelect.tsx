'use client'

import { Select } from "@mantine/core"
import { ListFranchise } from "./FranchisesList"
import { useState } from "react";
import FranchiseTable from "./FranchiseTable";
import CustomersListFromFranchise from "../Customers/CustomersListFromFranchise";


const FranchiseSelect = ({franchises } : {franchises :ListFranchise[]}) => {
    const franchiseNames : string[] = franchises.filter(x => x.name).map( e => e.name);
    const  [idSelected, setIdSelected] = useState<number | undefined>();

    
    function getSelectedValue(val : string){
        // debugger;
        const res : number  = franchises.filter(x => x.name == val)[0].franchise_id;
        console.log(res);
        // setIdSelected(res);
        // console.log(idSelected);
        
    }
  return (
    
    <Select
      label="Pick a Franchise from the list"
      placeholder="Pick value"
      data={franchiseNames}
      onChange={ e => getSelectedValue(e!)}
    />
    
  )
}

export default FranchiseSelect