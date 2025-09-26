import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminTable from "./components/AdminTable";
import Search from "../components/Search";
import axiosInstance from "../lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users?search=${search}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleEditUser = async (updatedUser) => {
    try {
      await axiosInstance.put(`/users/${updatedUser._id}`, updatedUser);
      fetchUsers(); // Refresh data
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      fetchUsers(); // Refresh data
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
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-100">
          <div className="mb-4">
            <Search onSearch={handleSearch} />
          </div>
          <AdminTable
            title="Users"
            columns={userColumns}
            data={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminUser;
