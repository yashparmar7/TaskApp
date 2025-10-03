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
    <nav className="sticky top-0 z-30 bg-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            {user.role === "admin" ? "Admin Dashboard" : "TaskApp"}
          </h1>

          <div className="flex items-center gap-2">
            <div className="relative">
              {user.role === "user" && (
                <button
                  className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 active:bg-gray-800 transition-colors text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={handleUserToggle}
                  aria-label="User menu"
                  aria-expanded={showUserCard}
                >
                  <User2 className="w-5 h-5" />
                </button>
              )}

              {showUserCard && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white shadow-xl rounded-lg p-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold text-gray-800 truncate">
                    {user.username}
                  </p>
                  <p className="text-gray-600 text-sm truncate mt-1">
                    {user.email}
                  </p>
                </div>
              )}
            </div>

            <button
              className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 active:bg-gray-800 transition-colors text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
