import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Tasks", path: "/admin-tasks" },
    { label: "Users", path: "/admin-users" },
    { label: "Profile", path: "/admin-profile" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-500 text-white p-8">
      <ul className="flex flex-col gap-5 text-lg font-bold">
        {menuItems.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className="cursor-pointer hover:text-gray-300 transition-colors"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
