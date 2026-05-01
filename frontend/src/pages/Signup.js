import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          display_name: username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSuccess("Account created successfully!");
      console.log("User created:", data);

      // optional reset
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border">

          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 p-2 mb-3 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#C4B07A] text-white py-2 rounded hover:bg-yellow-700"
            >
              Create Account
            </button>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;