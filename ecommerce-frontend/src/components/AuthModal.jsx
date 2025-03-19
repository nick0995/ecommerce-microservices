import React, { useState } from "react";
import axios from "axios";

export default function AuthModal({ setShowAuthModal }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignup ? "register" : "login";
      const { data } = await axios.post(`http://localhost:5001/api/auth/${endpoint}`, formData);

      localStorage.setItem("token", data.token);
      setShowAuthModal(false);
      window.location.reload(); // Refresh to reflect login state
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="block p-2 border rounded w-full mb-2"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block p-2 border rounded w-full mb-2"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="block p-2 border rounded w-full mb-2"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white p-2 rounded w-full mt-2"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button className="text-blue-500" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        <button
          className="text-red-500 mt-4 w-full"
          onClick={() => setShowAuthModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
