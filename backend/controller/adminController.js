const User = require("../model/User");
const Task = require("../model/Task");

// Get all users with search + pagination
const getAllUsers = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks with search + pagination
const getAllTasks = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    ).populate("user", "username email");

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllTasks,
  updateTask,
  deleteTask,
};
