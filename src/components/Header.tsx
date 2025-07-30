"use client"

import { format } from "date-fns"

type Props = {
  onNewTaskClick: () => void
}

export default function Header({ onNewTaskClick }: Props) {
  const now = new Date()

  const day = format(now, "dd")
  const weekday = format(now, "EEEE")
  const monthYear = format(now, "MMM yyyy")

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-row">
        <span className="text-4xl font-bold mx-2">{day}</span>
        <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">{weekday}</span>
            <span className="text-sm text-muted-foreground">{monthYear}</span>
        </div>
      </div>
      <button onClick={onNewTaskClick} 
      className="flex items-center justify-center"
      >
        <div className="p-1 rounded-full bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
        </div>
      <div className="bg-white text-black font-bold mx-2">NEW TASK</div>
      </button>
    </div>
  )
}
