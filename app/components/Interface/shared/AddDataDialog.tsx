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

type Props = {
  onAdd: (data: Datasource) => void;
};

export const AddDataDialog = ({}: Props) => {
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

  const handleSubmit = async () => {
    if (isValid && form.createdAt) {
      const payload = {
        ...form,
        createdAt: form.createdAt.toISOString(), // ✅ Convert Date to string
      };

      try {
        const res = await fetch("/api/datasources", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // ✅ Only serializable data
        });

        if (!res.ok) {
          console.error("Failed to submit data");
        } else {
          const result = await res.json();
          console.log("Successfully submitted:", result);
        }

        // Reset and close
        setForm({
          name: "",
          type: "",
          status: "",
          createdBy: "",
          createdAt: null,
        });
        setOpen(false);
      } catch (error) {
        console.error("Error submitting:", error);
      }
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
          {[
            { label: "Name", key: "name" },
            { label: "Type", key: "type" },
            { label: "Status", key: "status" },
            { label: "Created By", key: "createdBy" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                value={form[key as keyof typeof form] as string}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="col-span-2 space-y-1">
            <Label htmlFor="createdAt">Created At</Label>
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
              <PopoverContent className="w-auto p-0 z-50">
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
        </div>

        {/* Buttons */}
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
