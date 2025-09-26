import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";

const Cards = () => {
  const [dashboardData, setDashboardData] = useState([
    { id: 1, title: "Total Users", count: 0 },
    { id: 2, title: "Total Tasks", count: 0 },
  ]);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [usersRes, tasksRes] = await Promise.all([
        axiosInstance.get("/users"),
        axiosInstance.get("/tasks"),
      ]);
      setDashboardData([
        { id: 1, title: "Total Users", count: usersRes.data.length },
        { id: 2, title: "Total Tasks", count: tasksRes.data.length },
      ]);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {dashboardData.map((card) => (
        <div
          key={card.id}
          className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center"
        >
          <p className="text-gray-500">{card.title}</p>
          <h2 className="text-2xl font-bold">{card.count}</h2>
        </div>
      ))}
    </div>
  );
};

export default Cards;
