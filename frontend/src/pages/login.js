import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Server response:", data);

      if (response.ok) {
        // store user info
        localStorage.setItem("user", JSON.stringify(data.user));

        // optional admin flag (based on backend role)
        if (data.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
        }

        navigate("/admin");
      } else {
        setError(data.error || "Login failed");
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username / Email
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#C4B07A] text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              Sign In
            </button>

            {/* Signup */}
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