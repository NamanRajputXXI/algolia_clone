import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      // Save to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      // Set the username in state and navigate to the home page (dashboard)
      setUser(username);
      navigate("/");
    } else {
      alert("Please enter a valid username and password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
