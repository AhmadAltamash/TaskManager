"use client";
import TaskForm from "@/components/TaskForm";
import { GoPlus } from "react-icons/go";

const CreateTaskPage = () => {
  return (
    <div className="container flex items-center justify-center w-full h-[95vh]">
        <div className="shadow-lg rounded-2xl w-fit">
            <div className="flex justify-between px-4 items-center shadow-md">
            <h1 className="text-xl flex justify-start gap-1 items-center"><span className="p-1 bg-green-300 rounded-full"></span>Add Task</h1>
            <GoPlus/>
            </div>
            <TaskForm />
        </div>
    </div>
  )
}

export default CreateTaskPage