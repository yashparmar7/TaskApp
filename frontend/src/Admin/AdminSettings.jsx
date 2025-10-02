import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin");
  };

  return (
    <div className="p-8">
      <h1
        className="text-3xl text-gray-500 font-bold mb-4 cursor-pointer"
        onClick={handleClick}
      >
        Admin Settings
      </h1>
      <p className="text-gray-700 text-center text-2xl mt-60 ">
        Settings page under construction.
      </p>
    </div>
  );
};

export default AdminSettings;
