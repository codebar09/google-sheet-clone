import React from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import { Bold, Italic, Plus, Minus, Type, Palette } from 'lucide-react';

export const Toolbar: React.FC = () => {
  const { selectedCell, cells, updateCell, addRow, deleteRow, addColumn, deleteColumn } = useSpreadsheetStore();

  const handleFormatting = (type: 'bold' | 'italic') => {
    if (!selectedCell) return;
    const cell = cells[selectedCell];
    updateCell(selectedCell, {
      ...cell,
      format: {
        ...cell.format,
        [type]: !cell.format[type]
      }
    });
  };

  const handleFontSize = (change: number) => {
    if (!selectedCell) return;
    const cell = cells[selectedCell];
    updateCell(selectedCell, {
      ...cell,
      format: {
        ...cell.format,
        fontSize: Math.max(8, Math.min(72, cell.format.fontSize + change))
      }
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCell) return;
    const cell = cells[selectedCell];
    updateCell(selectedCell, {
      ...cell,
      format: {
        ...cell.format,
        color: e.target.value
      }
    });
  };

  const currentFormat = selectedCell ? cells[selectedCell]?.format : null;

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-white">
      <button
        onClick={() => handleFormatting('bold')}
        className={`p-2 rounded ${currentFormat?.bold ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => handleFormatting('italic')}
        className={`p-2 rounded ${currentFormat?.italic ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <div className="flex items-center gap-1">
        <Type size={16} />
        <button
          onClick={() => handleFontSize(-1)}
          className="p-1 hover:bg-gray-100 rounded"
          title="Decrease font size"
        >
          <Minus size={12} />
        </button>
        <span className="min-w-[20px] text-center">
          {currentFormat?.fontSize || 12}
        </span>
        <button
          onClick={() => handleFontSize(1)}
          className="p-1 hover:bg-gray-100 rounded"
          title="Increase font size"
        >
          <Plus size={12} />
        </button>
      </div>
      <div className="flex items-center gap-1">
        <Palette size={16} />
        <input
          type="color"
          value={currentFormat?.color || '#000000'}
          onChange={handleColorChange}
          className="w-6 h-6 p-0 border-0"
          title="Text color"
        />
      </div>
      <div className="border-l border-gray-200 h-6 mx-2" />
      <button
        onClick={addRow}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        title="Add row"
      >
        Add Row
      </button>
      <button
        onClick={deleteRow}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        title="Delete row"
      >
        Delete Row
      </button>
      <button
        onClick={addColumn}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        title="Add column"
      >
        Add Column
      </button>
      <button
        onClick={deleteColumn}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        title="Delete column"
      >
        Delete Column
      </button>
    </div>
  );
};