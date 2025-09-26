import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminTable from "./components/AdminTable";
import Search from "../components/Search";
import axiosInstance from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminTask = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [search]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(`/tasks?search=${search}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleEditTask = async (updatedTask) => {
    try {
      await axiosInstance.put(`/tasks/${updatedTask._id}`, updatedTask);
      fetchTasks(); // Refresh data
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      fetchTasks(); // Refresh data
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const taskColumns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    {
      key: "user",
      label: "User",
      render: (task) => task.user?.username || "N/A",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-4">
            <Search onSearch={handleSearch} />
          </div>
          <AdminTable
            title="Tasks"
            columns={taskColumns}
            data={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminTask;
