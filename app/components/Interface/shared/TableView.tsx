"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

import { isDate } from "../../helperFunctions/helperFunction";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableViewProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  rowsPerPage?: number;
};

export function TableView<T extends Record<string, unknown>>({
  data,
  columns,
  rowsPerPageOptions = [5, 10, 15],
  defaultRowsPerPage = 10,
}: TableViewProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (isDate(aVal) && isDate(bVal)) {
        return sortOrder === "asc"
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortKey, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, idx) => selectedRows.has(idx + page * rowsPerPage));

  const toggleSelectAll = () => {
    const newSelected = new Set(selectedRows);

    if (isAllSelected) {
      paginatedData.forEach((_, idx) =>
        newSelected.delete(idx + page * rowsPerPage)
      );
    } else {
      paginatedData.forEach((_, idx) =>
        newSelected.add(idx + page * rowsPerPage)
      );
    }

    setSelectedRows(newSelected);
  };

  const toggleRow = (index: number) => {
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);
  };

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-auto rounded-sm bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="pl-3 pr-1 py-1 w-4">
                <Checkbox
                  aria-label="Select All"
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="p-1 font-medium text-gray-600 hover:text-black cursor-pointer"
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => {
              const globalIndex = idx + page * rowsPerPage;
              const isChecked = selectedRows.has(globalIndex);

              return (
                <tr key={globalIndex} className="border-t hover:bg-gray-50">
                  <td className="pl-3 pr-1 py-1 w-4">
                    <Checkbox
                      aria-label={`Select row ${idx}`}
                      checked={isChecked}
                      onCheckedChange={() => toggleRow(globalIndex)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`py-2 text-base ${
                        col.key === "name" ? "pl-1 pr-2" : "p-2"
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex p-2 flex-col sm:flex-row justify-between items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Select
            defaultValue={String(rowsPerPage)}
            onValueChange={(val) => {
              setRowsPerPage(Number(val));
              setPage(0);
            }}
          >
            <SelectTrigger className="w-20 h-8 text-sm">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {rowsPerPageOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
