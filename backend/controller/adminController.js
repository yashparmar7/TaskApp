const User = require("../model/User");
const Task = require("../model/Task");
const asyncHandler = require("express-async-handler");

// Get all users with search + pagination
const getAllUsers = asyncHandler(async (req, res) => {
  let { search, page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = {
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ],
    };
  }

  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);

  res.status(200).json({
    users,
    totalUsers,
    totalPages,
    currentPage: page,
  });
});

// Update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, role },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
});

// Get all tasks with search + pagination
const getAllTasks = asyncHandler(async (req, res) => {
  let { search, page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ],
    };
  }

  const tasks = await Task.find(query)
    .populate("user", "username email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalTasks = await Task.countDocuments(query);
  const totalPages = Math.ceil(totalTasks / limit);

  res.status(200).json({
    tasks,
    totalTasks,
    totalPages,
    currentPage: page,
  });
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, user } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, status, user },
    { new: true }
  ).populate("user", "username email");

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json({
    message: "Task updated successfully",
    task: updatedTask,
  });
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllTasks,
  updateTask,
  deleteTask,
};
