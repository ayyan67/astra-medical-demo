import * as XLSX from 'xlsx'

// De-identification patterns
const PHI_PATTERNS = {
  names: /\b[A-Z][a-z]+ (?:[A-Z][a-z]+ )?[A-Z][a-z]+\b/g,
  phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  dates: /\b\d{4}-\d{2}-\d{2}\b/g,
  shortDates: /\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/g,
  medicalIds: /\bMRN\d+\b/g,
  patientId: /\b[A-Z]+\d+\b/g
}

function deidentifyText(text: string): string {
  if (!text) return text;
  
  let result = String(text)
    .replace(PHI_PATTERNS.names, '[NAME]')
    .replace(PHI_PATTERNS.phone, '[PHONE]')
    .replace(PHI_PATTERNS.email, '[EMAIL]')
    .replace(PHI_PATTERNS.ssn, '[SSN]')
    .replace(PHI_PATTERNS.medicalIds, '[ID]')
    .replace(PHI_PATTERNS.patientId, '[ID]')

  // Handle dates
  result = result.replace(PHI_PATTERNS.dates, '2020-01-01')
  result = result.replace(PHI_PATTERNS.shortDates, '01/01/2020')

  return result
}

function processWorkbook(workbook: XLSX.WorkBook): XLSX.WorkBook {
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    
    const deidentifiedData = jsonData.map(row => 
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          typeof value === 'string' ? deidentifyText(value) : value
        ])
      )
    );
    
    workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(deidentifiedData);
  });
  
  return workbook;
}

export async function deidentifyData(buffer: Buffer, fileType: string): Promise<Buffer> {
  const workbook = XLSX.read(buffer);
  const processedWorkbook = processWorkbook(workbook);
  
  if (fileType === 'text/csv') {
    const csvOutput = XLSX.utils.sheet_to_csv(processedWorkbook.Sheets[processedWorkbook.SheetNames[0]]);
    return Buffer.from(csvOutput);
  }
  
  return Buffer.from(XLSX.write(processedWorkbook, { type: 'buffer' }));
}