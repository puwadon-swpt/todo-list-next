"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockTasks, Task } from "@/lib/mockTasks";
import TaskList from "@/components/TaskList";
import Header from "@/components/Header";
import AddEditTaskDialog from "@/components/AddEditTaskDialog";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  const todoTasks = tasks.filter((t) => !t.is_done);
  const doneTasks = tasks.filter((t) => t.is_done);

  const handleAddTask = (newTask: {
    title: string;
    description: string;
    priority: "high" | "normal";
  }) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      is_done: false,
    };
    setTasks([task, ...tasks]);
    setOpen(false); // ปิด dialog หลังจาก add เสร็จ
  };

  const handleToggleDone = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_done: !t.is_done } : t))
    );
  };
  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmitTask = (data: {
    id?: string;
    title: string;
    description: string;
    priority: "high" | "normal";
  }) => {
    if (data.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === data.id ? { ...t, ...data } : t))
      );
    } else {
      const newTask: Task = {
        ...data,
        id: crypto.randomUUID(),
        is_done: false,
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    setOpen(false);
    setEditTask(null);
  };
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setEditTask(null);
        }}
      >
        <Header onNewTaskClick={() => setOpen(true)} />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTask ? "Edit Task" : "Add Task"}</DialogTitle>
          </DialogHeader>
          <AddEditTaskDialog
            onSubmit={handleSubmitTask}
            initial={editTask || undefined}
          />
        </DialogContent>
      </Dialog>

      <TaskList
        title="TODO TASKS"
        tasks={todoTasks}
        onToggleDone={handleToggleDone}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <TaskList
        title="DONE TASKS"
        tasks={doneTasks}
        onToggleDone={handleToggleDone}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </main>
  );
}
