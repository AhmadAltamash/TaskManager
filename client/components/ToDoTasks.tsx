'use client';
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

interface ToDoTasksProps {
  tasks: Task[];
}

export default function ToDoTasks({ tasks }: ToDoTasksProps) { // Typed props
  const toDoTasks = tasks.filter(task => task.status === "To Do"); 
  const toDoTasksLength = toDoTasks.length;

  return (
    <div className="w-1/3 bg-gray-300 p-4 rounded-lg h-[565px] overflow-y-auto">
      <div className="border-b-purple-800 flex items-center justify-center gap-2 border-b-2 mb-2">
        <span className="p-1 rounded-full bg-purple-800"></span>
        <h2 className="text-lg font-bold text-purple-800">To Do</h2>
        <span className="text-[.7rem] bg-gray-400 text-gray-900 px-[0.40rem] py-[0.10rem] rounded-full">
          {toDoTasksLength}
        </span>
      </div>
      <ul className="space-y-2">
        {toDoTasks.map(task => <TaskItem key={task._id} task={task} />)}
      </ul>
    </div>
  );
}
