import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    await Task.updateTimeoutTasks();
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo } = req.body;
    const task = new Task({ title, description, deadline, assignedTo });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    await Task.updateTimeoutTasks();
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });


    Object.assign(task, req.body);

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const getStreamingData = async (req, res) => {
  try {
    const response = await fetch("https://api.twitch.tv/helix/streams", {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID || "",
        Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN || ""}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch streaming data");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching streaming data" });
  }
};
