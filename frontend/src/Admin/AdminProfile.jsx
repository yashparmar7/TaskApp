import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "./components/Sidebar";

const AdminProfile = () => {
  let user = { username: "Unknown", email: "Not provided" };

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 h-screen sticky top-0 bg-white shadow">
          <Sidebar />
        </aside>
        <div className="p-6 flex-1 bg-gray-100">
          <div className="card w-full max-w-2xl mx-auto my-12  p-6 bg-gray-300 shadow-md rounded-lg border-2 border-gray-500">
            <div className="card-body p-6 ">
              <h2 className="card-title text-2xl text-gray-600 font-semibold mb-4">
                Admin Profile
              </h2>
              <p className="text-gray-900 mb-2">
                Name : <span className="font-medium">{user.username}</span>
              </p>
              <p className="text-gray-900">
                Email : <span className="font-medium">{user.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
