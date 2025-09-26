import { CircleX } from "lucide-react";
import React, { useState, useEffect } from "react";
import { taskAPI } from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

const UpdateTask = ({ task, closeModal, fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "",
      });
    }
  }, [task]);

  const handleInputUpdate = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await taskAPI.put(`/editTask/${task._id}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task Updated Successfully");
      console.log(res.data);

      await fetchTasks();

      await closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Task Update Failed");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 bg-black/10 backdrop-blur-sm z-10 fixed inset-0">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={closeModal}
          >
            <CircleX />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Task
        </h2>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter Task Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              name="title"
              value={taskData.title}
              onChange={handleInputUpdate}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Task Description
            </label>
            <textarea
              placeholder="Enter Task Description"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none resize-none"
              name="description"
              value={taskData.description}
              onChange={handleInputUpdate}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Task Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              name="status"
              value={taskData.status}
              onChange={handleInputUpdate}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all shadow-md"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
