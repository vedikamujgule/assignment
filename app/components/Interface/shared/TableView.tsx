"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isDate } from "app/components/helperFunctions/helperFunction";

type TableViewProps = {
  searchQuery: string;
  columns: Column<Datasource>[];
  rowsPerPage?: number;
  formatDate?: (dateStr: string) => string;
};

type Datasource = {
  datasource: string;
  type: string;
  status: string;
  createdBy: string;
  createdAt: string;
};

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export function TableView({
  searchQuery,
  columns,
  rowsPerPage = 10,
  formatDate,
}: TableViewProps) {
  const [data, setData] = useState<Datasource[]>([]);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);
  const [sortKey, setSortKey] = useState<keyof Datasource | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/datasources");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
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
  }, [filteredData, sortKey, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = page * currentRowsPerPage;
    return sortedData.slice(start, start + currentRowsPerPage);
  }, [sortedData, page, currentRowsPerPage]);

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, idx) =>
      selectedRows.has(idx + page * currentRowsPerPage)
    );

  const toggleSelectAll = () => {
    const updated = new Set(selectedRows);
    paginatedData.forEach((_, idx) => {
      const globalIdx = idx + page * currentRowsPerPage;
      if (isAllSelected) {
        updated.delete(globalIdx);
      } else {
        updated.add(globalIdx);
      }
    });
    setSelectedRows(updated);
  };

  const toggleRow = (idx: number) => {
    const updated = new Set(selectedRows);
    if (updated.has(idx)) {
      updated.delete(idx);
    } else {
      updated.add(idx);
    }
    setSelectedRows(updated);
  };

  const handleSort = (key: keyof Datasource) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(filteredData.length / currentRowsPerPage);

  return (
    <div
      className={`transition-opacity duration-300 ${
        loading ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="overflow-auto bg-white rounded border">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="pl-3 pr-1 py-2 w-4">
                <Checkbox
                  aria-label="Select All"
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="p-2 cursor-pointer hover:text-black"
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
              const globalIdx = idx + page * currentRowsPerPage;
              const isChecked = selectedRows.has(globalIdx);
              return (
                <tr key={globalIdx} className="border-t hover:bg-gray-50">
                  <td className="pl-3 pr-1 py-2 w-4">
                    <Checkbox
                      aria-label={`Select row ${idx}`}
                      checked={isChecked}
                      onCheckedChange={() => toggleRow(globalIdx)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`py-2 text-sm ${
                        col.key === "datasource" ? "pl-1 pr-2" : "p-2"
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : col.key === "createdAt" && formatDate
                        ? formatDate(row[col.key] as string)
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
      <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Select
            defaultValue={String(currentRowsPerPage)}
            onValueChange={(val) => {
              setCurrentRowsPerPage(Number(val));
              setPage(0);
            }}
          >
            <SelectTrigger className="w-20 h-8 text-sm">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
  );
}
