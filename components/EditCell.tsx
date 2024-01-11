import { Button, CloseButton, Flex, Space } from '@mantine/core';
import { IconCheck, IconClearAll, IconPencil, IconX } from '@tabler/icons-react';
import { Row, Table } from '@tanstack/react-table'
import {MouseEvent} from 'react'

const EditCell = ({row,table}: {row: Row<any>, table: any}) => {

    const meta = table.options.meta;

    const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
      debugger;
        const elName = e.currentTarget.name;
        meta?.setEditedRows((old: []) => ({
        [row.id]: !old[Number(row.id)],
        }));
        
        if (elName !== 'edit') {
          if(elName === 'done'){
            const res = meta?.updateD;
            console.log('editedRowVal: ', res);
          }
          meta?.revertData(row.index, e.currentTarget.name === 'cancel');
        }
    };
    // console.log(meta.editedRows[row.id],row.index);

    const removeRow = () => {
        meta?.removeRow(row.index);
    };

    const updateRowVal = (e: MouseEvent<HTMLButtonElement>) => {
      const elName = e.currentTarget.name;
      if (elName !== 'edit') {
        const res = meta?.updateD;
        console.log('editedRowVal: ', res);
        meta?.revertData(row.index, e.currentTarget.name === 'cancel');
      }
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