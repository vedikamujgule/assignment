// app/components/config/datasource-columns.ts

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type Datasource = {
  datasource: string;
  type: string;
  status: string;
  createdAt: string;
  createdBy: string;
};

export const columns: Column<Datasource>[] = [
  {
    key: "datasource",
    label: "Datasource",
    sortable: true,
  },
  {
    key: "type",
    label: "Type",
    sortable: true,
    render: (value: string) => {
      const colorMap: Record<string, string> = {
        PDF: "bg-red-100 text-red-600",
        CSV: "bg-green-100 text-green-700",
        DOCX: "bg-blue-100 text-blue-700",
      };

      const classes =
        colorMap[value.toUpperCase()] || "bg-gray-100 text-gray-700 table-text";

      return (
        <span className={`text-xs font-medium rounded px-2 py-1 ${classes}`}>
          {value}
        </span>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value: string) => {
      const colorMap: Record<string, string> = {
        Uploaded: "bg-green-100 text-green-700",
        Connected: "bg-green-100 text-green-700",
        Failed: "bg-red-100 text-red-600",
      };

      const classes = colorMap[value] || "bg-gray-100 table-text";

      return (
        <span className={`text-xs font-medium rounded px-2 py-1 ${classes}`}>
          {value}
        </span>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created at",
    sortable: true,
    render: (val: string) =>
      new Date(val).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  },
  {
    key: "createdBy",
    label: "Created by",
    sortable: true,
  },
];
