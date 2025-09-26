import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { CirclePlus } from "lucide-react";
import CreateTask from "./CreateTask";
import Table from "../components/Table";
import usePaginatedTasks from "../hooks/usePaginatedTasks";
import Search from "../components/Search";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { tasks, totalPages, fetchTasks } = usePaginatedTasks(
    page,
    limit,
    search
  );

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
  };

  return (
    <div className="dashboard">
      <Toaster />
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-6 flex justify-between px-4">
          <Search onSearch={handleSearch} />
          <button
            onClick={openModal}
            aria-label="Create a new task"
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 "
          >
            <CirclePlus />
            <span className="ml-2 font-semibold">Create Task</span>
          </button>
        </div>
        <div className="task-add">
          {isOpen && (
            <CreateTask closeModal={closeModal} fetchTasks={fetchTasks} />
          )}
        </div>
        <div className="mt-6">
          <Table
            tasks={tasks}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
            limit={limit}
            fetchTasks={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
