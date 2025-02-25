import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description: string;
    status: string;
    deadline: string;
  };
}

export default function TaskItem({ task }: TaskProps) {
  const { editTask, removeTask } = useTaskContext();
  const [showMenu, setShowMenu] = useState(false);

  // Format deadline to DD/MM/YY
  const formattedDeadline = new Date(task.deadline).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  // Toggle menu visibility
  const toggleMenu = () => setShowMenu((prev) => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && !(event.target as HTMLElement).closest(".menu-container")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative p-4 bg-white rounded-lg flex flex-col gap-5 shadow-md">
      <div>
        {/* Status and Dots/Close Icon Toggle */}
        <div className="flex justify-between items-center">
          <div
            className={`px-2 rounded-md text-[.8rem] flex items-center justify-center ${
              task.status === "Done" ? "bg-green-200 text-green-600" : task.status === "In Progress" ? "bg-orange-200 text-orange-600" : " bg-pink-100 text-pink-400"
            }`}
          >
            {task.status}
          </div>
          <div
            className="cursor-pointer hover:bg-gray-300 flex items-center justify-center transition-all ease-in-out duration-200 rounded-full p-1"
            onClick={toggleMenu}
          >
            {showMenu ? <IoIosClose size={20} /> : <HiOutlineDotsHorizontal size={20} />}
          </div>
        </div>

        {/* Task Info */}
        <div className="text-lg font-semibold">{task.title}</div>
        <div className="text-gray-400 text-[0.85rem]">{task.description}</div>
      </div>

      {/* Deadline */}
      <div className="text-sm text-gray-600">Deadline: {formattedDeadline}</div>

      {/* Popup Menu */}
      {showMenu && (
  <div className="menu-container absolute top-10 right-2 bg-white shadow-md rounded-md w-40 border p-2 z-10">
    {task.status !== "Done" && task.status !== "In Progress" ? (
      <>
        <button
          className="block w-full text-left p-2 hover:bg-gray-200 rounded-md"
          onClick={() => {
            editTask(task._id, { status: "Done" });
            setShowMenu(false);
          }}
        >
          ✅ Completed
        </button>
        <button
          className="block w-full text-left p-2 hover:bg-gray-200 rounded-md"
          onClick={() => {
            editTask(task._id, { status: "In Progress" });
            setShowMenu(false);
          }}
        >
          🔄 In Progress
        </button>
      </>
    ) : task.status === "In Progress" ? (
      <button
        className="block w-full text-left p-2 hover:bg-gray-200 rounded-md"
        onClick={() => {
          editTask(task._id, { status: "Done" });
          setShowMenu(false);
        }}
      >
        ✅ Completed
      </button>
    ) : null}

    <button
      className="block w-full text-left p-2 hover:bg-red-200 rounded-md text-red-600"
      onClick={() => {
        removeTask(task._id);
        setShowMenu(false);
      }}
    >
      ❌ Delete
    </button>
  </div>
)}

    </div>
  );
}
