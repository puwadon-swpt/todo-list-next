"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onNewTaskClick: () => void;
};

export default function Header({ onNewTaskClick }: Props) {
  const now = new Date();
  const day = format(now, "dd");
  const weekday = format(now, "EEEE");
  const monthYear = format(now, "MMM yyyy");

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-row">
        <span className="text-4xl font-bold mx-2">{day}</span>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">{weekday}</span>
          <span className="text-sm text-muted-foreground">{monthYear}</span>
        </div>
      </div>

      <Button
        onClick={onNewTaskClick}
        variant="ghost"
        className="flex items-center gap-2 font-bold text-black bg-white hover:bg-gray-100"
      >
        <div className="p-1 rounded-full bg-purple-500 text-white hover:bg-purple-600">
          <Plus size={16} />
        </div>
        NEW TASK
      </Button>
    </div>
  );
}
