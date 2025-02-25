'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";

export interface Task {
    _id: string; // ✅ Make `_id` optional
    title: string;
    description: string;
    assignedTo: string;
    deadline: string;
    status: "To Do" | "In Progress" | "Done" | "Timeout";
    createdAt: string;
  }
  

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (id: string, updatedTask: Partial<Task>) => void;
  removeTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
        try {
            const fetchedTasks = await fetchTasks();
            console.log("Fetched Tasks:", fetchedTasks); // Debugging
            setTasks(fetchedTasks);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };
    loadTasks();
}, []);


  const addTask = async (task: Omit<Task, "id">) => {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (id: string, updatedTask: Partial<Task>) => {
    await updateTask(id, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
