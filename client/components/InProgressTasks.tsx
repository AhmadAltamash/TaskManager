'use client';
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

interface InProgressTasksProps {
  tasks: Task[];
}

export default function InProgressTasks({ tasks }: InProgressTasksProps) {
  const inProgressTasks = tasks.filter(task => task.status === "In Progress");
  const inProgressTasksLength = tasks.filter(task => task.status === "In Progress").length;

  return (
    <div className="w-1/3 bg-gray-300 p-4 rounded-lg h-[565px] overflow-y-auto">
      <div className="border-b-orange-400 flex items-center justify-center gap-2 border-b-2 mb-2"><span className="p-1 rounded-full bg-orange-400"></span><h2 className="text-lg font-bold text-orange-400">In Progress</h2> <span className="text-[.7rem] bg-gray-400 text-gray-900 px-[0.40rem] py-[0.10rem] rounded-full">{inProgressTasksLength}</span></div>
      <ul className="space-y-2">
        {inProgressTasks.map(task => <TaskItem key={task._id} task={task} />)}
      </ul>
    </div>
  );
}
