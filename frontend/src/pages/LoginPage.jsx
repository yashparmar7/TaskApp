import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { authAPI } from "../lib/axiosInstance.js";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await authAPI.post("/login", loginData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      const userRole = res.data.user.role;
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

      console.log("Token:", res.data.token);
      console.log("User:", res.data.user);
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Login Failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Login Now
        </h1>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-gray-800 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
