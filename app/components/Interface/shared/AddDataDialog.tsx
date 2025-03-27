"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Datasource } from "app/components/config/datasource-columns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Status } from "app/components/enums/Status";
import { FileType } from "app/components/enums/FileType";

type Props = {
  onAdd: (data: Datasource) => void;
};

export const AddDataDialog = ({ onAdd }: Props) => {
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [form, setForm] = useState<
    Omit<Datasource, "createdAt"> & { createdAt: Date | null }
  >({
    name: "",
    type: "",
    status: "",
    createdBy: "",
    createdAt: null,
  });

  const isTextOnly = (val: string) => isNaN(Number(val.trim()));
  const isValid =
    form.name.trim() &&
    form.type &&
    form.status &&
    form.createdBy.trim() &&
    form.createdAt !== null &&
    isTextOnly(form.name) &&
    isTextOnly(form.createdBy);

  const handleSubmit = async () => {
    if (!isValid || !form.createdAt) return;

    const payload = {
      ...form,
      createdAt: form.createdAt.toISOString(),
    };

    try {
      const res = await fetch("/api/datasources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        onAdd({ ...form, createdAt: form.createdAt });
        console.log("Submitted:", result);
        setForm({
          name: "",
          type: "",
          status: "",
          createdBy: "",
          createdAt: null,
        });
        setOpen(false);
      } else {
        console.error("Failed to submit");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add New Data
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Name Field */}
          <div className="space-y-1">
            <Label htmlFor="name">Datasource</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter datasource name"
            />
          </div>

          {/* Created By Field */}
          <div className="space-y-1">
            <Label htmlFor="createdBy">Created By</Label>
            <Input
              id="createdBy"
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              placeholder="Enter creator's name"
            />
          </div>

          {/* File Type Dropdown */}
          <div className="space-y-1">
            <Label htmlFor="type">Type</Label>
            <Select
              value={form.type}
              onValueChange={(value) => setForm({ ...form, type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(FileType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm({ ...form, status: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Status).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Picker */}
          <div className="col-span-2 space-y-1">
            <Label htmlFor="createdAt">Created At</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.createdAt && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.createdAt
                    ? format(form.createdAt, "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50">
                <Calendar
                  mode="single"
                  selected={form.createdAt ?? undefined}
                  onSelect={(date) => {
                    setForm({ ...form, createdAt: date ?? null });
                    setCalendarOpen(false); // ✅ Close after select
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
