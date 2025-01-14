export const evaluateFormula = (formula: string, getCellValue: (ref: string) => string): string => {
  if (!formula.startsWith('=')) return formula;

  const cleanFormula = formula.substring(1).toUpperCase();
  
  // Handle basic mathematical functions
  if (cleanFormula.startsWith('SUM(')) {
    const range = parseRange(cleanFormula.slice(4, -1));
    const values = range.map(getCellValue).filter(v => !isNaN(Number(v)));
    return values.reduce((sum, val) => sum + Number(val), 0).toString();
  }

  if (cleanFormula.startsWith('AVERAGE(')) {
    const range = parseRange(cleanFormula.slice(8, -1));
    const values = range.map(getCellValue).filter(v => !isNaN(Number(v)));
    return (values.reduce((sum, val) => sum + Number(val), 0) / values.length).toString();
  }

  if (cleanFormula.startsWith('MAX(')) {
    const range = parseRange(cleanFormula.slice(4, -1));
    const values = range.map(getCellValue).filter(v => !isNaN(Number(v)));
    return Math.max(...values.map(Number)).toString();
  }

  if (cleanFormula.startsWith('MIN(')) {
    const range = parseRange(cleanFormula.slice(4, -1));
    const values = range.map(getCellValue).filter(v => !isNaN(Number(v)));
    return Math.min(...values.map(Number)).toString();
  }

  if (cleanFormula.startsWith('COUNT(')) {
    const range = parseRange(cleanFormula.slice(6, -1));
    return range.map(getCellValue).filter(v => !isNaN(Number(v))).length.toString();
  }

  // Handle data quality functions
  if (cleanFormula.startsWith('TRIM(')) {
    const ref = cleanFormula.slice(5, -1);
    return getCellValue(ref).trim();
  }

  if (cleanFormula.startsWith('UPPER(')) {
    const ref = cleanFormula.slice(6, -1);
    return getCellValue(ref).toUpperCase();
  }

  if (cleanFormula.startsWith('LOWER(')) {
    const ref = cleanFormula.slice(6, -1);
    return getCellValue(ref).toLowerCase();
  }

  return '#ERROR!';
};

const parseRange = (range: string): string[] => {
  const [start, end] = range.split(':');
  if (!end) return [start];

  const startCol = start.match(/[A-Z]+/)?.[0] ?? 'A';
  const startRow = parseInt(start.match(/\d+/)?.[0] ?? '1');
  const endCol = end.match(/[A-Z]+/)?.[0] ?? startCol;
  const endRow = parseInt(end.match(/\d+/)?.[0] ?? startRow);

  const cells: string[] = [];
  for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
    for (let row = startRow; row <= endRow; row++) {
      cells.push(`${String.fromCharCode(col)}${row}`);
    }
  }
  return cells;
};