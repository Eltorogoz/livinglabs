import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header at the top */}
      <Header />

      {/* Main content area expands to fill available space */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Sign In
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access the Living Lab Purdue University
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username / Career Account Field */}
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

            {/* Password / BoilerKey Field */}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#C4B07A] focus:ring-[#C4B07A] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">
                  Forgot your password?
                </a>
              </div>
            </div>

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

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default Login;