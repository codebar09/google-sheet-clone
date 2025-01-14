import React, { useState, useEffect } from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import { evaluateFormula } from '../utils/formulas';

export const FormulaBar: React.FC = () => {
  const { selectedCell, cells, updateCell } = useSpreadsheetStore();
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (selectedCell) {
      setFormula(cells[selectedCell].formula || cells[selectedCell].value);
    }
  }, [selectedCell, cells]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const handleFormulaSubmit = () => {
    if (!selectedCell) return;

    const getCellValue = (ref: string) => cells[ref]?.value || '';

    if (formula.startsWith('=')) {
      updateCell(selectedCell, {
        formula,
        value: evaluateFormula(formula, getCellValue)
      });
    } else {
      updateCell(selectedCell, {
        formula: '',
        value: formula
      });
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-white">
      <span className="font-mono">{selectedCell || ''}</span>
      <input
        type="text"
        value={formula}
        onChange={handleFormulaChange}
        onBlur={handleFormulaSubmit}
        onKeyDown={(e) => e.key === 'Enter' && handleFormulaSubmit()}
        className="flex-1 px-2 py-1 border border-gray-300 rounded"
        placeholder="Enter a value or formula (e.g., =SUM(A1:A5))"
      />
    </div>
  );
};