// utils/getFileTypeBadgeStyle.ts

import { FileType } from "../enums/FileType";
import { Status } from "../enums/Status";

export function getFileTypeBadgeStyle(type: FileType): string {
  return (
    {
      [FileType.PDF]: "bg-red-100 text-red-600",
      [FileType.CSV]: "bg-green-100 text-green-700",
      [FileType.DOCX]: "bg-blue-100 text-blue-700",
    }[type] ?? "bg-gray-100 text-gray-700"
  );
}

export function getStatusBadgeStyle(status: Status): string {
  return (
    {
      [Status.Uploaded]: "bg-green-100 text-green-700",
      [Status.Connected]: "bg-blue-100 text-blue-700",
      [Status.Failed]: "bg-red-100 text-red-600",
    }[status] ?? "badge-default"
  );
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}
