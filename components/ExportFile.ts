import { Table } from "@tanstack/react-table";
import { Workbook } from "exceljs";
import {saveAs} from "file-saver"; 

export default async function exportFile (table: Table<any>,fileName: string) {

    const wb = new Workbook();
    const ws = wb.addWorksheet('Filtered customer data');

    const lastHearderGroup = table.getHeaderGroups().at(-1);

    if(!lastHearderGroup){
        console.error('No Header groups found',table.getHeaderGroups());
        return;
    }

    ws.columns = lastHearderGroup.headers.filter(h => h.column).map(header => {
            return {
                header: header.column.columnDef.header as string,
                key: header.id,
                width: 20
            };

    });
    const exportedData = table.getFilteredRowModel().rows.length > 0 ? table.getFilteredRowModel().rows : table.getCoreRowModel().rows;
    exportedData.forEach(row =>{
        const cells = row.getVisibleCells();
        const values = cells.map(cell => cell.getValue() ?? '');
        console.log('excel values', values);
        ws.addRow(values);
    })

    ws.getRow(1).eachCell(cell =>{
        cell.font = {bold : true};    
    })

    const buf = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buf]),`${fileName}.xlsx`);
}

