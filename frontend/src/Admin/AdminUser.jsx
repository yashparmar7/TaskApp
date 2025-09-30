import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminTable from "./components/AdminTable";
import Search from "../components/Search";
import axiosInstance from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [search, page, limit]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/users?search=${search}&page=${page}&limit=${limit}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleEditUser = async (updatedUser) => {
    try {
      await axiosInstance.put(`/users/${updatedUser._id}`, updatedUser);
      fetchUsers();
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      if (users.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchUsers();
      }
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const userColumns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
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
            title="Users"
            columns={userColumns}
            data={users}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminUser;
