"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export type TaskInput = {
  id?: string
  title: string
  description: string
  priority: "high" | "normal"
}

type Props = {
  onSubmit: (task: TaskInput) => void
  initial?: TaskInput
}

export default function AddEditTaskDialog({ onSubmit, initial }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"high" | "normal">("normal")

  useEffect(() => {
    if (initial) {
      setTitle(initial.title)
      setDescription(initial.description)
      setPriority(initial.priority)
    }
  }, [initial])

  const handleSubmit = () => {
    if (!title) return
    onSubmit({ id: initial?.id, title, description, priority })
    setTitle("")
    setDescription("")
    setPriority("normal")
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>Priority</Label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "high" | "normal")}
          className="w-full border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <Button onClick={handleSubmit}>{initial ? "Update" : "Save"}</Button>
    </div>
  )
}
