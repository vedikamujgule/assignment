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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Datasource } from "./config/datasource-columns";

type Props = {
  onAdd: (data: Datasource) => void;
};

export const AddDataPopup = ({ onAdd }: Props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<
    Omit<Datasource, "createdAt"> & { createdAt: Date | null }
  >({
    name: "",
    type: "",
    status: "",
    createdBy: "",
    createdAt: null,
  });

  const isValid =
    form.name.trim() &&
    form.type.trim() &&
    form.status.trim() &&
    form.createdBy.trim() &&
    form.createdAt !== null;

  const handleSubmit = () => {
    if (isValid && form.createdAt) {
      onAdd({ ...form, createdAt: form.createdAt });
      setForm({
        name: "",
        type: "",
        status: "",
        createdBy: "",
        createdAt: null,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Data</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Type</Label>
            <Input
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Input
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            />
          </div>
          <div>
            <Label>Created By</Label>
            <Input
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
            />
          </div>
          <div>
            <Label>Created At</Label>
            <Popover>
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
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.createdAt ?? undefined}
                  onSelect={(date) =>
                    setForm({ ...form, createdAt: date ?? null })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button className="mt-4" disabled={!isValid} onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
