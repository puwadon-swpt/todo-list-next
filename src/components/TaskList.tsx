import { Task } from "@/lib/mockTasks"
import TaskCard from "./TaskCard"

type Props = {
  title: string
  tasks: Task[]
  onToggleDone: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskList({ title, tasks, onToggleDone, onEdit, onDelete }: Props) {
  return (
    <div className="mb-8">
      <hr className="h-px my-8 border-dashed border-t-2 border-gray-200"/>
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
          key={task.id}
          task={task}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        ))}
      </div>
    </div>
  )
}
