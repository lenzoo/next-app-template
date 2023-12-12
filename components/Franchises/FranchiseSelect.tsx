'use client'

import { Select } from "@mantine/core"
import { ListFranchise } from "./FranchisesList";
import { useRouter } from "next/navigation";
import { useState } from "react";




const FranchiseSelect = ({franchises } : {franchises :ListFranchise[]}) => {
    const franchiseNames : string[] = franchises.filter(x => x.name).map( e => e.name);
    // const  [idSelected, setIdSelected] = useState<number>(0);

    const router = useRouter();

    // function createQueryString(res : number){
    //   const params = new URLSearchParams();
    //   params.set("franchiseId", res.toString());
      
    //   router.push("/customers" + "?" + params);
    // }


    function getSelectedValue(val : string){
        // debugger;
      const res : number  = franchises.filter(x => x.name == val)[0].franchise_id;    
      // setIdSelected(res);
      // console.log(idSelected);
      // router.push(`/customers?franchiseId=${res}`);
      // createQueryString(res);

      const params = new URLSearchParams();
      params.set("franchiseId", res.toString());
      
      router.push("/franchises" + "?" + params);
      
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