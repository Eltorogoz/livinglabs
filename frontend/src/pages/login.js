import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

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

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin");
        } else {
          localStorage.removeItem("isAdmin");
          setError("This account is not an Admin.");
        }
      } else {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("user");
        setError(data.error || "Invalid login");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Server not reachable");
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

          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Purdue Career Account Alias
              </label>

              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C4B07A] focus:border-[#C4B07A] sm:text-sm"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password or BoilerKey
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#C4B07A] focus:border-[#C4B07A] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#C4B07A] text-white py-2 rounded hover:bg-yellow-700"
            >
              Sign In
            </button>

            {/* Signup */}
            <Link to="/signup">
              <button
                type="button"
                className="w-full border border-[#C4B07A] text-[#C4B07A] py-2 rounded mt-2 hover:bg-[#C4B07A] hover:text-white"
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