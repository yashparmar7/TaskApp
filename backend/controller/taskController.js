const Task = require("../model/Task");

const handleTaskCreate = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      status,
      user: req.user._id,
    });
    await newTask.save();
    res.status(201).json({ message: "Task added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleTaskDisplay = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    let query = { user: req.user._id };
    if (search) {
      query = {
        user: req.user._id,
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
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleTaskEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleTaskDelete = async (req, res) => {
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
  handleTaskCreate,
  handleTaskDisplay,
  handleTaskEdit,
  handleTaskDelete,
};
