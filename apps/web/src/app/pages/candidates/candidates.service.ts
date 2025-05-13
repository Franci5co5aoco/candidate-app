import { Injectable } from '@angular/core';
import { Candidate } from '@candidate-app/shared';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  generateExcell(jsonData: Pick<Candidate, 'seniority' | 'years' | 'availability'>): FormData {
    // Convert JSON to a sheet and a book
    const worksheet = XLSX.utils.json_to_sheet([jsonData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet-1");

    // Generate the file as a Blob
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const formData = new FormData();
    // Add the Excell file
    formData.append('excel', excelBlob, 'data.xlsx');

    return formData;
  }
  
}
