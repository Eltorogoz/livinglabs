import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 41e8543 (updated project code)

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Logging in with:", username, password);
=======
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username, // matches backend email field
          password,
        }),
        credentials: "include", // needed for session cookies
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Login successful
      console.log("Logged in user:", data.user);
      alert(`Welcome, ${data.user.display_name}!`);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error, check console");
    }
>>>>>>> 41e8543 (updated project code)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header at the top */}
      <Header />

<<<<<<< HEAD
      {/* Main content area expands to fill available space */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign In
            </h2>
=======
      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
>>>>>>> 41e8543 (updated project code)
            <p className="mt-2 text-sm text-gray-600">
              Access the Living Lab Purdue University
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
<<<<<<< HEAD
            {/* Username / Career Account Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
=======
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
>>>>>>> 41e8543 (updated project code)
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

<<<<<<< HEAD
            {/* Password / BoilerKey Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
=======
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
>>>>>>> 41e8543 (updated project code)
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#C4B07A] focus:ring-[#C4B07A] border-gray-300 rounded"
                />
<<<<<<< HEAD
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
=======
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
>>>>>>> 41e8543 (updated project code)
                  Remember me
                </label>
              </div>

              <div className="text-sm">
<<<<<<< HEAD
                <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                  Forgot your password?
                </a>
=======
                <button
                  type="button"
                  className="font-medium text-yellow-600 hover:text-yellow-500"
                >
                  Forgot your password?
                </button>
>>>>>>> 41e8543 (updated project code)
              </div>
            </div>

            {/* Submit Button */}
<<<<<<< HEAD
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

=======
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C4B07A] hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C4B07A] transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
>>>>>>> 41e8543 (updated project code)
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default Login;