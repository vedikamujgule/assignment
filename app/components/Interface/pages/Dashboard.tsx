"use client";

import { useState } from "react";
import { TableView } from "../shared/TableView";
import { MoreVertical, Search, CirclePlus, Folders, X } from "lucide-react";
import { columns } from "../../config/datasource-columns";
import { Button } from "@/components/ui/button";
import { Sidebar } from "../shared/sidebar";
import { AddDataDialog } from "../shared/AddDataDialog";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pt-7 p-6 ml-6 md:ml-0 overflow-x-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-md text-gbaserey">
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

        {/* Search, Filters, and Actions */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex flex-row w-full max-w-sm gap-2">
            <div className="relative w-full">
              {/* Search Icon */}
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

              {/* Input Field */}
              <Input
                className="pl-10 pr-8 py-2 text-md border rounded-md bg-white w-full"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Clear Icon (X) */}
              {searchQuery && (
                <X
                  className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>
            <Button
              variant="outline"
              className="table-text px-3 cursor-pointer"
            >
              <CirclePlus className="w-4 h-4 mr-2" /> Type
            </Button>
            <Button
              variant="outline"
              className="table-text px-3 cursor-pointer"
            >
              <CirclePlus className="w-4 h-4 mr-2" /> Status
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AddDataDialog onAdd={handleAddData} />
            <Button
              variant="ghost"
              size="icon"
              className="border border-grey rounded-md cursor-pointer"
            >
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-white overflow-auto transition-opacity duration-300">
          <TableView
            key={refreshKey}
            columns={columns}
            rowsPerPage={10}
            searchQuery={searchQuery}
            formatDate={(dateStr: string) =>
              new Date(dateStr).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            }
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
