const Task = require("../model/Task");
const asyncHandler = require("express-async-handler");

const handleTaskCreate = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newTask = new Task({
    title,
    description,
    status,
    user: req.user._id,
  });
  await newTask.save();
  res.status(201).json({ message: "Task added successfully" });
});

const handleTaskDisplay = asyncHandler(async (req, res) => {
  let { page, limit, search } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const skip = (page - 1) * limit;

  let query = { user: req.user._id, isDeleted: { $ne: true } };
  if (search) {
    query = {
      user: req.user._id,
      isDeleted: { $ne: true },
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ],
    };
  }

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalTasks = await Task.countDocuments(query);
  const totalPages = Math.ceil(totalTasks / limit);

  res.status(200).json({
    tasks,
    totalPages,
    currentPage: page,
    total: totalTasks,
  });
});

const handleTaskEdit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }
  res
    .status(200)
    .json({ message: "Task updated successfully", task: updatedTask });
});

const handleTaskDelete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const taskDelete = await Task.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!taskDelete) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  handleTaskCreate,
  handleTaskDisplay,
  handleTaskEdit,
  handleTaskDelete,
};
