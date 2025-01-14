export interface Cell {
  id: string;
  value: string;
  formula: string;
  format: CellFormat;
}

export interface CellFormat {
  bold: boolean;
  italic: boolean;
  fontSize: number;
  color: string;
}

export interface SpreadsheetState {
  cells: { [key: string]: Cell };
  selectedCell: string | null;
  rows: number;
  columns: number;
  addRow: () => void;
  deleteRow: () => void;
  addColumn: () => void;
  deleteColumn: () => void;
  updateCell: (id: string, updates: Partial<Cell>) => void;
  setSelectedCell: (id: string | null) => void;
}