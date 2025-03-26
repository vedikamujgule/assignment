// datasource-columns.ts
import { Badge } from "@/components/ui/badge";
import { Column } from "../TableView";
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
    render: (value) => (
      <span
        className={`text-xs px-2 py-1 rounded-md font-medium ${getFileTypeBadgeStyle(
          value
        )}`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => (
      <Badge
        className={`text-xs ${
          value === "Connected"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    label: "Created at",
    sortable: true,
    render: (value: Date) =>
      value
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
