// app/components/config/datasource-columns.tsx

import { Column } from "../Interface/shared/TableView";
import { FileType } from "../enums/FileType";
import { getFileTypeBadgeStyle } from "../helperFunctions/helperFunction";

export type Datasource = {
  name: string;
  type: string;
  status: string;
  createdAt: Date;
  createdBy: string;
};

export const columns: Column<Datasource>[] = [
  {
    key: "name",
    label: "Datasource",
  },
  {
    key: "type",
    label: "Type",
    render: (value) =>
      typeof value === "string" ? (
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${getFileTypeBadgeStyle(
            value as FileType
          )}`}
        >
          {value}
        </span>
      ) : null,
  },
  {
    key: "status",
    label: "Status",
    render: (value) =>
      typeof value === "string" ? (
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${
            value === "Connected"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {value}
        </span>
      ) : null,
  },
  {
    key: "createdAt",
    label: "Created at",
    sortable: true,
    render: (value) =>
      value instanceof Date
        ? value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
  },
  {
    key: "createdBy",
    label: "Created by",
    sortable: true,
  },
];
