import { Button, CloseButton, Flex, Space } from '@mantine/core';
import { IconCheck, IconClearAll, IconPencil, IconX } from '@tabler/icons-react';
import { Row, Table } from '@tanstack/react-table'
import {MouseEvent} from 'react'
import { CustomerRespDTO } from './Customers/CustomersListFromFranchise';

const EditCell = ({row,table}: {row: Row<any>, table: any}) => {

    const meta = table.options.meta;

    const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
      
        const elName = e.currentTarget.name;
        meta?.setEditedRows((old: []) => ({
        [row.id]: !old[Number(row.id)],
        }));
        
        if (elName !== 'edit') {
          if(elName === 'done'){
            const res = meta?.updateD;
            console.log('editedRowVal: ', JSON.stringify(res));
            updateRowVal(res);
          }
          meta?.revertData(row.index, e.currentTarget.name === 'cancel');
        }
    };
    // console.log(meta.editedRows[row.id],row.index);

    const removeRow = () => {
        meta?.removeRow(row.index);
    };

    const  updateRowVal = (res : any) => {
      debugger;
       fetch('http://localhost:5120/UpdateCustomerData',{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(res)
       })
       .then(response => response.json())
       .then(json => console.log('api result from server: ',json))
       .catch(err => console.error('Error: ', err));
      
    }

    return meta?.editedRows[row.id]  ? (  
      <>
        <Flex
          align="flex-start"
          direction="row"
          gap={'md'}
        >
          <Button onClick={setEditedRows} name="done"> <IconCheck></IconCheck></Button>  
          <Button onClick={setEditedRows} name="cancel"> <IconX /></Button>
        </Flex>
      </>      
    ): (  
      <Button onClick={setEditedRows} name="edit"><IconPencil /></Button>                                                     
    )
}

export default EditCell