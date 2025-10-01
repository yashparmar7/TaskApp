import React, { useState } from "react";
import { LogOut, User2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showUserCard, setShowUserCard] = useState(false);
  const navigate = useNavigate();

  let user = { username: "", email: "" };
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  const handleUserToggle = () => {
    setShowUserCard((prev) => !prev);
    setTimeout(() => setShowUserCard(false), 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="shadow-lg sticky top-0 z-30 h-18 flex items-center bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        <p className="text-3xl text-gray-600 font-extrabold cursor-pointer">
          {user.role === "admin" ? "Admin Dashboard" : "TaskApp"}
        </p>

        <div className="relative flex gap-2">
          <button
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 transition text-white p-3 rounded-2xl"
            onClick={handleUserToggle}
          >
            <User2 className="w-5 h-5" />
          </button>

          {showUserCard && (
            <div className="absolute top-14 right-0 w-52 bg-white shadow-lg rounded-xl p-4 border border-gray-200">
              <p className="font-semibold text-gray-700">{user.username}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          )}

          <button
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 transition text-white p-3 rounded-2xl"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
