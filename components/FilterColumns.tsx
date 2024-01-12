import { Flex, NumberInput, Select, TextInput } from '@mantine/core'
import { Column,Table as ReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'


const FilterColumns = ({column,table,}: {column: Column<any, unknown>,table: ReactTable<any>}) => {
    
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)

    
  
    const columnFilterValue = column.getFilterValue()
  
    const sortedUniqueValues = useMemo(
      () =>
        typeof firstValue === 'number'
          ? []
          : Array.from(column.getFacetedUniqueValues().keys()).sort(),
      [column.getFacetedUniqueValues()]
    )
        return typeof firstValue === 'number' ? (
          <>
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"                
            >
              <NumberInput
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={e =>
                  column.setFilterValue((old: [number, number]) => [
                    e,
                    old?.[1],
                  ])
                }
                placeholder={`Min`}
                size='sm'
                
              />
              <NumberInput
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={value =>
                  column.setFilterValue((old: [number, number]) => [old?.[0], value])
                }
                placeholder={`Max`}
                size='sm'
              />

            </Flex>
              
          </>
        ) : typeof firstValue === 'string' ? (

              <Select
                placeholder={`Search...`}
                className="w-30 border shadow rounded"
                onChange={e => column.setFilterValue(e)}
                value={(columnFilterValue ?? '') as string}
                data={sortedUniqueValues}
                searchable
                clearable
              >
              </Select>          
                        
        ) : null
     
}

export default FilterColumns