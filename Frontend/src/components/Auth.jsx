import React, { useState } from "react";
import axios from "axios";

const Auth = ({ onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegistering) {
        // Register user
        await axios.post("http://localhost:5000/api/register", { email, password });
        alert("Registered successfully! Logging you in...");

        // Auto-login after registration
        const res = await axios.post("http://localhost:5000/api/login", { email, password });
        localStorage.setItem("token", res.data.token);
        onAuthSuccess(); // Go to CodeReview
      } else {
        // Login user
        const res = await axios.post("http://localhost:5000/api/login", { email, password });
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        onAuthSuccess(); // Go to CodeReview
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? "Sign Up" : "Log In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
            disabled={loading}
          >
            {loading ? "Please wait..." : isRegistering ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={toggleMode} className="text-blue-400 underline">
            {isRegistering ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
