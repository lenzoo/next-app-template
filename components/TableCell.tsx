
import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react'

const TableCell = ({getValue,row,column,table}:{getValue: any,row: any,column: any, table: any}) => {

    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
    // const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    console.log(value);

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    const onBlur = () => {
      tableMeta.updateData(row.index, column.id)
      
    }
    console.log(tableMeta.editedRows[row.id]);
  return  (
    <TextInput
      value={value}
      onBlur={onBlur}
      onChange={(event) => setValue(event.currentTarget.value)}
      disabled={!tableMeta.editedRows[row.id]}
    />
  ) 
}

export default TableCell