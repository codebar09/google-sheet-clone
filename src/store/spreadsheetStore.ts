import { create } from 'zustand';
import { SpreadsheetState, Cell } from '../types/spreadsheet';

const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

const createInitialCells = () => {
  const cells: { [key: string]: Cell } = {};
  for (let row = 1; row <= INITIAL_ROWS; row++) {
    for (let col = 0; col < INITIAL_COLS; col++) {
      const colLetter = String.fromCharCode(65 + col);
      const id = `${colLetter}${row}`;
      cells[id] = {
        id,
        value: '',
        formula: '',
        format: {
          bold: false,
          italic: false,
          fontSize: 12,
          color: '#000000'
        }
      };
    }
  }
  return cells;
};

export const useSpreadsheetStore = create<SpreadsheetState>((set) => ({
  cells: createInitialCells(),
  selectedCell: null,
  rows: INITIAL_ROWS,
  columns: INITIAL_COLS,

  addRow: () => set((state) => {
    const newRow = state.rows + 1;
    const newCells = { ...state.cells };
    for (let col = 0; col < state.columns; col++) {
      const colLetter = String.fromCharCode(65 + col);
      const id = `${colLetter}${newRow}`;
      newCells[id] = {
        id,
        value: '',
        formula: '',
        format: {
          bold: false,
          italic: false,
          fontSize: 12,
          color: '#000000'
        }
      };
    }
    return { rows: newRow, cells: newCells };
  }),

  deleteRow: () => set((state) => {
    if (state.rows <= 1) return state;
    const newCells = { ...state.cells };
    for (let col = 0; col < state.columns; col++) {
      const colLetter = String.fromCharCode(65 + col);
      const id = `${colLetter}${state.rows}`;
      delete newCells[id];
    }
    return { rows: state.rows - 1, cells: newCells };
  }),

  addColumn: () => set((state) => {
    if (state.columns >= 26) return state;
    const newCells = { ...state.cells };
    const newColLetter = String.fromCharCode(65 + state.columns);
    for (let row = 1; row <= state.rows; row++) {
      const id = `${newColLetter}${row}`;
      newCells[id] = {
        id,
        value: '',
        formula: '',
        format: {
          bold: false,
          italic: false,
          fontSize: 12,
          color: '#000000'
        }
      };
    }
    return { columns: state.columns + 1, cells: newCells };
  }),

  deleteColumn: () => set((state) => {
    if (state.columns <= 1) return state;
    const newCells = { ...state.cells };
    const colLetter = String.fromCharCode(65 + state.columns - 1);
    for (let row = 1; row <= state.rows; row++) {
      const id = `${colLetter}${row}`;
      delete newCells[id];
    }
    return { columns: state.columns - 1, cells: newCells };
  }),

  updateCell: (id, updates) => set((state) => ({
    cells: {
      ...state.cells,
      [id]: { ...state.cells[id], ...updates }
    }
  })),

  setSelectedCell: (id) => set({ selectedCell: id })
}));