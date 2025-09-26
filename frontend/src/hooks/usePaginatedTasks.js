import { useState, useEffect, useCallback } from "react";
import { taskAPI } from "../lib/axiosInstance";

const usePaginatedTasks = (page, limit, search = "") => {
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await taskAPI.get(
        `/getTasks?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, totalPages, fetchTasks };
};

export default usePaginatedTasks;
