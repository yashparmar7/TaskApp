import React, { useEffect, useState } from "react";
import { PencilLine, Trash2 } from "lucide-react";
import UpdateTask from "../pages/UpdateTask";
import { taskAPI } from "../lib/axiosInstance";
import toast from "react-hot-toast";

const Table = ({
  tasks,
  totalPages,
  page,
  setPage,
  limit,
  setLimit,
  fetchTasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsOpen(false);
  };

  useEffect(() => {
    setPage(1);
  }, [limit, setPage]);

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await taskAPI.delete(`/deleteTask/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTasks();
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Task deletion failed");
    }
  };

  return (
    <div className="mt-6 w-full">
      <table className="w-full bg-white rounded shadow overflow-hidden border border-gray-200">
        <thead className="bg-gray-500 text-gray-300">
          <tr>
            <th className="px-5 py-4 border">Task</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-gray-500">
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border-t px-4 py-2 flex justify-evenly">
                  <button onClick={() => openModal(task)}>
                    <PencilLine className="cursor-pointer bg-blue-500 text-white p-1 rounded" />
                  </button>

                  <span className="h-5 border-1 border-gray-500"></span>

                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Are you sure you want to delete this task?`
                      );
                      if (confirmDelete) {
                        handleDeleteTask(task._id);
                      }
                    }}
                  >
                    <Trash2 className="cursor-pointer bg-red-500 text-white p-1 rounded" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isOpen && (
        <UpdateTask
          task={selectedTask}
          closeModal={closeModal}
          fetchTasks={fetchTasks}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded bg-gray-500 hover:bg-gray-600 text-white"
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded bg-gray-500 hover:bg-gray-600 text-white "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
