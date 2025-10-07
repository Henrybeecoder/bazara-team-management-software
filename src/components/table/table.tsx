
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'react-feather';

interface Column<T> {
  header: string;
  key?: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
}

interface ActionPopupState {
  show: boolean;
  x: number;
  y: number;
  teamId: number | null;
}

interface SharedTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onAction?: (action: string, teamId: number) => void;
}

const SharedTable = <T extends Record<string, any>>({ 
  columns, 
  data, 
  onAction 
}: SharedTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [actionPopup, setActionPopup] = useState<ActionPopupState>({ 
    show: false, 
    x: 0, 
    y: 0, 
    teamId: null 
  });

  const totalPages: number = Math.ceil(data.length / pageSize);
  const startIndex: number = (currentPage - 1) * pageSize;
  const endIndex: number = startIndex + pageSize;
  const currentData: T[] = data.slice(startIndex, endIndex);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setSelectedRows(currentData.map((_, i) => startIndex + i));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index: number): void => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, teamId: number): void => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setActionPopup({
      show: true,
      x: rect.left - 120,
      y: rect.bottom + 5,
      teamId
    });
  };

  const handleAction = (action: string): void => {
    if (onAction && actionPopup.teamId !== null) {
      onAction(action, actionPopup.teamId);
    }
    setActionPopup({ show: false, x: 0, y: 0, teamId: null });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible: number = 5;
    let start: number = Math.max(1, currentPage - 2);
    let end: number = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center text-xs font-medium ${
            currentPage === i
              ? 'bg-[#1659E6] text-white rounded-full'
              : 'text-[#333333]'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1659E6]">
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === currentData.length && currentData.length > 0}
                  className="w-4 h-4"
                />
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="p-3 text-left text-white text-sm font-bold"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentData.map((row, rowIndex) => {
              const actualIndex: number = startIndex + rowIndex;
              return (
                <tr key={actualIndex} className="border-b border-gray-200">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(actualIndex)}
                      onChange={() => handleSelectRow(actualIndex)}
                      className="w-4 h-4"
                    />
                  </td>
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="p-3 text-[#333333] text-sm font-normal"
                    >
                      {col.render ? col.render(row, actualIndex) : row[col.key as string]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <span className="text-[#333333] text-sm font-normal">Page Size:</span>
          <select
            value={pageSize}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 text-sm text-[#333333]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-[#808080]" />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-[#808080]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#333333] text-xs font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <span className="text-[#333333] text-sm font-normal">Go to page</span>
          <select
            value={currentPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentPage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm text-[#333333]"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                {String(page).padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {actionPopup.show && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setActionPopup({ show: false, x: 0, y: 0, teamId: null })}
          />
          <div
            className="fixed bg-white border border-gray-200 rounded shadow-lg z-20"
            style={{ left: `${actionPopup.x}px`, top: `${actionPopup.y}px` }}
          >
            <button
              onClick={() => handleAction('edit')}
              className="block w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-100"
            >
              Edit Team
            </button>
            <button
              onClick={() => handleAction('delete')}
              className="block w-full text-left px-4 py-2 text-sm text-[#333333] hover:bg-gray-100"
            >
              Delete Team
            </button>
          </div>
        </>
      )}
    </div>
  );
};