"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreamingData = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.createTask = exports.getTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const checkTimeout_1 = require("../utils/checkTimeout");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, checkTimeout_1.checkAndUpdateTimeoutTasks)();
        const tasks = yield task_model_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, deadline, assignedTo } = req.body;
        const task = new task_model_1.default({ title, description, deadline, assignedTo });
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
});
exports.createTask = createTask;
// Get a single task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching task", error: error.message });
    }
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating task", error: error.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting task", error: error.message });
    }
});
exports.deleteTask = deleteTask;
// Fetch data from a streaming API (e.g., Twitch API)
const getStreamingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://api.twitch.tv/helix/streams", {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID || "",
                Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN || ""}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch streaming data");
        }
        const data = yield response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching streaming data", error: error });
    }
});
exports.getStreamingData = getStreamingData;
