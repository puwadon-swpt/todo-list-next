"use client";

import { useState } from "react";
import { Task } from "@/lib/mockTasks";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  task: Task
  onToggleDone?: (id: string) => void
  onEdit?: (task: Task) => void
  onDelete?: (id: string) => void
}

export default function TaskCard({ task, onToggleDone, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const getBgColor = () => {
    if (task.is_done) return "bg-green-500";
    if (task.priority === "high") return "bg-orange-500";
    return "bg-blue-500";
  };

  const priorityLabel = task.is_done
    ? "DONE"
    : task.priority === "high"
    ? "HIGH PRIORITY"
    : "NORMAL PRIORITY";

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(true)}
        className={`text-white p-4 rounded-xl flex justify-between items-center shadow-md cursor-pointer gap-4 ${getBgColor()}`}
      >
        <div className="flex-grow overflow-hidden">
          <p className="text-xs uppercase opacity-80 tracking-wide">
            {priorityLabel}
          </p>
          <h3 className="text-lg font-semibold truncate">{task.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{task.description}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleDone?.(task.id);
          }}
          className={`w-6 h-6 shrink-0 rounded-full border-2 border-white flex items-center justify-center transition-all duration-200 ${
            task.is_done ? "bg-white text-green-500" : ""
          }`}
        >
          {task.is_done && <CheckIcon size={14} />}
        </button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{task.description}</p>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  onEdit?.(task);
                }}
                className="text-sm text-blue-500 hover:underline mx-1"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onDelete?.(task.id);
                }}
                className="text-sm text-red-500 hover:underline mx-1"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
