'use client'
import { useState } from "react";
import DoneTasks from "@/components/DoneTasks";
import InProgressTasks from "@/components/InProgressTasks";
import TaskCard from "@/components/TaskCard";
import ToDoTasks from "@/components/ToDoTasks";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTaskContext } from "../context/TaskContext";

const Home = () => {
  const { tasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // ✅ Function to handle filtering
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === "A-Z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === "Z-A") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filter) {
      filtered = filtered.filter((task) => task.status === filter);
    }

    return filtered;
  };

  return (
    <div className="h-screen w-full box-border p-0 m-0">
      {/* 🔹 Search Bar & Filter Button */}
      <div className="mx-auto h-20 w-[90%] bg-gray-300 mt-5 flex justify-between items-center rounded-full relative">
        <div className="input flex ml-8 h-full items-center w-[60%] relative">
          <IoIosSearch className="absolute ml-2 cursor-pointer" size={"24"} />
          <input
            className="h-[50%] w-[50%] shadow-lg outline-none focus:outline-blue-400 pl-10 rounded-3xl"
            placeholder="Search Tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-100 w-[7%] h-[50%] mr-8 rounded-md outline-none focus:outline-blue-400 flex gap-2 justify-center items-center text-gray-600 font-normal relative"
          onClick={() => setShowFilterMenu((prev) => !prev)}
        >
          <CiFilter />
          Filter
          <MdOutlineKeyboardArrowDown />
        </button>

        {/* 🔹 Filter Menu Popup */}
        {showFilterMenu && (
          <div className="absolute top-20 right-8 bg-white shadow-lg rounded-md w-40 border p-2 z-10">
            {["A-Z", "Z-A", "To Do", "In Progress", "Done"].map((option) => (
              <button
                key={option}
                className="block w-full text-left p-2 hover:bg-gray-200 rounded-md"
                onClick={() => {
                  setFilter(option);
                  setShowFilterMenu(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Task Sections */}
      <div className="flex gap-5 mx-auto w-[90%] mt-10">
        <TaskCard />
        <ToDoTasks tasks={getFilteredTasks()} />
        <InProgressTasks tasks={getFilteredTasks()} />
        <DoneTasks tasks={getFilteredTasks()} />
      </div>
    </div>
  );
};

export default Home;
