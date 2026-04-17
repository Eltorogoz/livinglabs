import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [error, setError] = useState("");

=======
>>>>>>> 5b74d2d0c692a4bf02b3f692dad7ac1291204c1d
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin login.")
    }

    // Add your authentication logic here
    console.log("Logging in with:", username, password);
=======
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
>>>>>>> 5b74d2d0c692a4bf02b3f692dad7ac1291204c1d
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
<<<<<<< HEAD
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
=======
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
>>>>>>> 5b74d2d0c692a4bf02b3f692dad7ac1291204c1d
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

<<<<<<< HEAD
              {/* Submit Button */}
            <div className="space-y-3">
              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#C4B07A] hover:bg-yellow-700 transition"
              >
                Sign in
              </button>

              {/* Sign Up Button */}
              <Link to="/signup">
              <button
                type="button"
                className="w-full py-2 px-4 rounded-md border border-[#C4B07A] text-[#C4B07A] hover:bg-[#C4B07A] hover:text-white transition"
              >
                Create an Account
              </button>
            </Link>
            </div>
          </form>
        </div>
      </main>
=======
          </form>
        </div>
      </main>

>>>>>>> 5b74d2d0c692a4bf02b3f692dad7ac1291204c1d
      <Footer />
    </div>
  );
}

export default Login;