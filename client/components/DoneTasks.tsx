'use client';
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

interface DoneTasksProps {
  tasks: Task[];
}

export default function DoneTasks({tasks} : DoneTasksProps) {
  const doneTasks = tasks.filter(task => task.status === "Done");
  const doneTasksLength = tasks.filter(task => task.status === "Done").length;

  return (
    <div className="w-1/3 bg-gray-300 p-4 rounded-lg h-[565px] overflow-y-auto">
      <div className="border-b-green-400 flex items-center justify-center gap-2 border-b-2 mb-2"><span className="p-1 rounded-full bg-green-400 border-b-green-400"></span><h2 className="text-lg font-bold text-green-border-b-green-400">Done</h2> <span className="text-[.7rem] bg-gray-400 text-gray-900 px-[0.40rem] py-[0.10rem] rounded-full">{doneTasksLength}</span></div>
      <ul className="space-y-2">
        {doneTasks.map(task => <TaskItem key={task._id} task={task} />)}
      </ul>
    </div>
  );
}
