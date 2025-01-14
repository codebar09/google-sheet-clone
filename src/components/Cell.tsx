import React, { useState, useEffect } from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import { evaluateFormula } from '../utils/formulas';
import clsx from 'clsx';

interface CellProps {
  id: string;
}

export const Cell: React.FC<CellProps> = ({ id }) => {
  const { cells, selectedCell, updateCell, setSelectedCell } = useSpreadsheetStore();
  const cell = cells[id];
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(cell.formula || cell.value);

  const isSelected = selectedCell === id;

  const getCellValue = (ref: string) => {
    return cells[ref]?.value || '';
  };

  useEffect(() => {
    if (cell.formula) {
      const evaluated = evaluateFormula(cell.formula, getCellValue);
      if (evaluated !== cell.value) {
        updateCell(id, { ...cell, value: evaluated });
      }
    }
  }, [cell.formula, id]);

  const handleDoubleClick = () => {
    setEditing(true);
    setEditValue(cell.formula || cell.value);
  };

  const handleBlur = () => {
    setEditing(false);
    if (editValue.startsWith('=')) {
      updateCell(id, {
        ...cell,
        formula: editValue,
        value: evaluateFormula(editValue, getCellValue)
      });
    } else {
      updateCell(id, {
        ...cell,
        value: editValue,
        formula: ''
      });
    }
  };

  return (
    <div
      className={clsx(
        'w-[120px] h-[30px] border border-gray-200 flex items-center px-2 flex-shrink-0 overflow-hidden',
        isSelected && 'border-2 border-blue-500',
        cell.format.bold && 'font-bold',
        cell.format.italic && 'italic'
      )}
      style={{
        fontSize: `${cell.format.fontSize}px`,
        color: cell.format.color
      }}
      onClick={() => setSelectedCell(id)}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBlur();
            }
          }}
          className="w-full h-full outline-none"
          autoFocus
        />
      ) : (
        <span className="truncate w-full">{cell.value}</span>
      )}
    </div>
  );
};