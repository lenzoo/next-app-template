import { ColumnDef,Row,RowData } from '@tanstack/react-table'

import { CustomerRespDTO } from './Customers/CustomersListFromFranchise'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button, Flex, TextInput } from '@mantine/core'
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react'


// declare module '@tanstack/react-table' {
//     interface TableMeta<TData extends RowData> {
//       updateData: (rowIndex: number, columnId: string, value: unknown) => void,
//       revertData: (rowIndex: number, revert: boolean) => void,
//       editedRows: Object , setEditedRows: Object
//     }
//   }

const updatedTableCell: Partial<ColumnDef<CustomerRespDTO>> = { cell: ({ getValue, row: { index}, column: { id }, table }) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)
      const [editRow, SetEditRow] = useState(false);
      

      // console.log('ValueEdit :',Number(Object.keys(table.options.meta?.editedRows!).filter(s => Number(s) !== index)[0]), index);
  
      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        // table.options.meta?.updateData(index, id, value)
      }
  
      // If the initialValue is changed external, sync it up with our state
      // console.log(initialValue);

      // const activateEdit = Number(Object.keys(table.options.meta?.editedRows!).filter(s => Number(s) == index));
        // console.log(activateEdit, index);
        // SetEditRow(activateEdit == index ? false : true);


      useEffect(() => {
        index = -1;
        setValue(initialValue)
      }, [initialValue])
  
      return (                
        <TextInput
          value={value as string}
          onChange={e => setValue(e.target.value)}
          onBlur={onBlur}
          // disabled={activateEdit == index ? false : true}
        />
      )
    },
  }

  export default updatedTableCell;