import React from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import { Cell } from './Cell';

export const Grid: React.FC = () => {
  const { rows, columns } = useSpreadsheetStore();

  const renderHeaderRow = () => {
    return (
      <div className="flex">
        <div className="w-[50px] h-[30px] bg-gray-100 border border-gray-200 flex-shrink-0" />
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`header-${index}`}
            className="w-[120px] h-[30px] bg-gray-100 border border-gray-200 flex items-center justify-center font-semibold flex-shrink-0"
          >
            {String.fromCharCode(65 + index)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderHeaderRow()}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex">
          <div className="w-[50px] h-[30px] bg-gray-100 border border-gray-200 flex items-center justify-center font-semibold flex-shrink-0">
            {rowIndex + 1}
          </div>
          {Array.from({ length: columns }).map((_, colIndex) => {
            const id = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
            return <Cell key={id} id={id} />;
          })}
        </div>
      ))}
    </div>
  );
};