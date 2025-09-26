const express = require("express");
const {
  handleTaskDisplay,
  handleTaskCreate,
  handleTaskEdit,
  handleTaskDelete,
} = require("../controller/taskController");
const verifyUser = require("../middleware/verifyAuthUser");

const router = express.Router();

router.post("/createTask", verifyUser, handleTaskCreate);
router.get("/getTasks", verifyUser, handleTaskDisplay);
router.put("/editTask/:id", verifyUser, handleTaskEdit);
router.delete("/deleteTask/:id", verifyUser, handleTaskDelete);

module.exports = router;
