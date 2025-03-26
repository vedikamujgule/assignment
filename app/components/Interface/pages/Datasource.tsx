"use client";

import { useState, useMemo } from "react";
import { TableView } from "../shared/TableView";
import { MoreVertical, Search, CirclePlus, Folders } from "lucide-react";
import { columns, Datasource } from "../../config/datasource-columns";
import { data as staticData } from "../../config/datasource-data";
import { Button } from "@/components/ui/button";
import { Sidebar } from "../shared/sidebar";
import { AddDataDialog } from "../shared/AddDataDialog";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Datasource[]>(staticData);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter((row) =>
      Object.values(row).some((value) => {
        if (value instanceof Date) {
          return value
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [searchQuery, data]);

  const handleAddData = (newData: Datasource) => {
    setData((prev) => [...prev, newData]);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-x-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-md text-base">
          <Folders className="w-4 h-4" />
          <span className="text-xs opacity-50">|</span>
          <span>Datasources</span>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-6 pt-5">
          <h1 className="text-xl font-semibold text-base">Datasources</h1>
          <p className="text-md text-base">
            Upload files, connect to databases, or integrate with apps.
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1 min-w-[384px] max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-grey" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-10 pr-10 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2 text-md"
            >
              <CirclePlus className="w-4 h-4" />
              Type
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-md"
            >
              <CirclePlus className="w-4 h-4" />
              Status
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <AddDataDialog onAdd={handleAddData} />
            <Button
              variant="ghost"
              size="icon"
              className="border border-grey rounded-md"
            >
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Table or Empty Message */}
        <div className="rounded-lg border bg-white overflow-auto">
          {filteredData.length > 0 ? (
            <TableView<Datasource>
              data={filteredData}
              columns={columns}
              rowsPerPage={8}
            />
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              No data found
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
