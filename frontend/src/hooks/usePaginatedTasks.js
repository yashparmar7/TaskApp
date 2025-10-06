import { useState, useEffect, useCallback } from "react";
import { taskAPI } from "../lib/axiosInstance";

const usePaginatedTasks = (page, limit, search = "") => {
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [cache, setCache] = useState({});

  const fetchTasks = useCallback(
    async (isCatch = false) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const cacheKey = `${page}-${limit}-${search}`;

        if (!isCatch && cache[cacheKey]) {
          setTasks(cache[cacheKey].tasks);
          setTotalPages(cache[cacheKey].totalPages);
          return;
        }

        const res = await taskAPI.get(
          `/getTasks?page=${page}&limit=${limit}&search=${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedTasks = Array.isArray(res.data.tasks)
          ? res.data.tasks
          : [];

        setTasks(fetchedTasks);
        setTotalPages(res.data.totalPages || 1);

        setCache((prev) => ({
          ...prev,
          [cacheKey]: {
            tasks: fetchedTasks,
            totalPages: res.data.totalPages || 1,
          },
        }));
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      }
    },
    [page, limit, search, cache]
  );

  useEffect(() => {
    fetchTasks();
  }, [page, limit, search, fetchTasks]);

  return { tasks, totalPages, fetchTasks };
};

export default usePaginatedTasks;
