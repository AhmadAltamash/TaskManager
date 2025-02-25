import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { 
      type: String, 
      enum: ["To Do", "In Progress", "Done", "Timeout"], 
      default: "To Do" 
    },
    deadline: { type: Date },
    assignedTo: { type: String },
  },
  { timestamps: true }
);

// Middleware to check timeout status before saving
TaskSchema.pre("save", function (next) {
  if (this.deadline && this.deadline < new Date()) {
    this.status = "Timeout";
  }
  next();
});

// Static method to update expired tasks
TaskSchema.statics.updateTimeoutTasks = async function () {
  await this.updateMany(
    { deadline: { $lt: new Date() }, status: { $ne: "Timeout" } },
    { $set: { status: "Timeout" } }
  );
};

const Task = mongoose.model("Task", TaskSchema);
export default Task;
