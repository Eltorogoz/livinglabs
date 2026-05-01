import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          display_name: username,
          password: password
        })
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Raw server response:", text);
        throw new Error("Server did not return valid JSON");
      }

      if (response.ok) {
        // Ensure role exists
        if (!data.user.role) {
          data.user.role = "user";
        }

        // Save login info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const isAdmin = data.user.role === "admin";
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

        // Redirect based on role
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } else {
        setError(data.error || "Invalid login");
      }

    } catch (err) {
      console.error("Network error:", err);
      setError("Server not reachable or API misconfigured");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>
          <p className="text-center text-gray-600 mb-6">
            Access Living Lab Purdue University
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                placeholder="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#C4B07A] text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              Sign In
            </button>

            <Link to="/signup">
              <button
                type="button"
                className="w-full border border-[#C4B07A] text-[#C4B07A] py-2 rounded hover:bg-[#C4B07A] hover:text-white transition"
              >
                Create Account
              </button>
            </Link>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
