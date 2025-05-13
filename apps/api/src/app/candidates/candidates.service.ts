
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class CandidatesService {
    create(data: string, excel: Express.Multer.File) {
        // Convert the Excel file buffer to JSON
        const workbook = XLSX.read(excel.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelJson = XLSX.utils.sheet_to_json(sheet);

        const jsonData = JSON.parse(data);
        const excelObject =  typeof excelJson[0] === 'object' && excelJson[0] !== null ? excelJson[0] : {}

        const result = {...jsonData,...excelObject};

        return result;
    }
}
