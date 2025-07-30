// src/app/page.tsx
"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { GET_TODOS } from "@/graphql/queries"
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_DONE,
} from "@/graphql/mutations"
import TaskList from "@/components/TaskList"
import Header from "@/components/Header"
import AddEditTaskDialog from "@/components/AddEditTaskDialog"
import { Task } from "@/types"

export default function HomePage() {
  const { data, loading, error, refetch } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO, { refetchQueries: [{ query: GET_TODOS }] })
  const [updateTodo] = useMutation(UPDATE_TODO, { refetchQueries: [{ query: GET_TODOS }] })
  const [deleteTodo] = useMutation(DELETE_TODO, { refetchQueries: [{ query: GET_TODOS }] })
  const [toggleDone] = useMutation(TOGGLE_DONE, { refetchQueries: [{ query: GET_TODOS }] })

  const [editTask, setEditTask] = useState<Task | null>(null)
  const [open, setOpen] = useState(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const tasks: Task[] = data?.todos || []
  const todoTasks = tasks.filter((t) => !t.is_done)
  const doneTasks = tasks.filter((t) => t.is_done)

  const handleToggleDone = async (id: string, is_done: boolean) => {
    await toggleDone({ variables: { id, is_done: !is_done } })
  }

  const handleEditTask = (task: Task) => {
    setEditTask(task)
    setOpen(true)
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo({ variables: { id } })
  }

  const handleSubmitTask = async (data: {
    id?: string
    title: string
    description: string
    priority: "high" | "normal"
  }) => {
    if (data.id) {
      await updateTodo({ variables: data })
    } else {
      await addTodo({ variables: data })
    }
    setOpen(false)
    setEditTask(null)
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o)
          if (!o) setEditTask(null)
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
  )
}
