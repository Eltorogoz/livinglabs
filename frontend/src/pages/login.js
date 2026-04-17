import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });

      const data = await response.json();

      console.log("Server response:", data);

      if (response.ok) {
        console.log("Login successful");

        // OPTIONAL: store user info
        localStorage.setItem("user", JSON.stringify(data.user));

        // redirect to admin/projects page
        navigate("/admin");
      } else {
        console.log("Login failed:", data.error);
        alert(data.error);
      }

    } catch (err) {
      console.error("Network error:", err);
      alert("Server not reachable");
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
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
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