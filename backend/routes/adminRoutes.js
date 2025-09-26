const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controller/adminController");
const verifyUser = require("../middleware/verifyAuthUser");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

// User routes
router.get("/users", verifyUser, verifyAdmin, getAllUsers);
router.put("/users/:id", verifyUser, verifyAdmin, updateUser);
router.delete("/users/:id", verifyUser, verifyAdmin, deleteUser);

// Task routes
router.get("/tasks", verifyUser, verifyAdmin, getAllTasks);
router.put("/tasks/:id", verifyUser, verifyAdmin, updateTask);
router.delete("/tasks/:id", verifyUser, verifyAdmin, deleteTask);

module.exports = router;
