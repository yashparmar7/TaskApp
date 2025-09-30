import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminTable from "./components/AdminTable";
import Search from "../components/Search";
import axiosInstance from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminTask = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [search, page, limit]);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get(
        `/tasks?search=${search}&page=${page}&limit=${limit}`
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleEditTask = async (updatedTask) => {
    try {
      await axiosInstance.put(`/tasks/${updatedTask._id}`, updatedTask);
      fetchTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Task Update Failed");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      if (tasks.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchTasks();
      }
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
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 h-screen sticky top-0 bg-white shadow">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-4">
            <Search onSearch={handleSearch} />
          </div>
          <AdminTable
            title="Tasks"
            columns={taskColumns}
            data={tasks}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            usersList={tasks.map((task) => task.username || "N/A")}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminTask;
