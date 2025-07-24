import React, { useState } from "react";
import axios from "axios";

const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const subTextColor = isDarkMode ? "text-gray-400" : "text-gray-700";
  const sectionGradient = isDarkMode
    ? "bg-gradient-to-b from-black to-gray-900"
    : "bg-gradient-to-b from-white to-gray-100";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const cardText = isDarkMode ? "text-white" : "text-black";
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-600";
  const highlight = isDarkMode ? "text-purple-400" : "text-purple-700";
  const btnBg = isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 hover:bg-blue-500";
  const btnText = "text-white";
  const border = isDarkMode ? "" : "border border-gray-300";
  const glowText = isDarkMode ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "";

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { email:username, password });
      setMessage("Signup successful! You can now login.");
      // Optionally reset form or hide signup
      setUsername("");
      setPassword("");
      setShowSignup(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  }

  return (
    <>
      {/* Theme Toggle Button */}
      <div className={`fixed top-8 right-5`}>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full ${btnBg} ${btnText} font-semibold shadow-lg transition`}
        >
          {isDarkMode ? "☀" : "🌙"}
        </button>
      </div>

      <section
        id="features"
        className={`min-h-screen ${bgColor} ${textColor} px-6 md:px-20 pt-32 flex flex-col md:flex-row items-center justify-between gap-10 transition-colors duration-500`}
      >
        {!showSignup ? (
          <>
            <div className="flex-1 text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>AI</span>{" "}
                <span className={highlight}>Code Reviewer</span>
                <br />
                <span className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>
                  to supercharge your workflow
                </span>
              </h1>

              <p className={`${subTextColor} text-xl mt-6 max-w-xl`}>
                Accelerate your code reviews, reduce bugs, and ensure high-quality
                code using AI-driven suggestions and automation.
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center">
              <button
                onClick={() => setShowSignup(true)}
                className={`${btnBg} ${btnText} px-8 py-3 rounded-full font-semibold transition duration-300`}
              >
                LET'S GET STARTED
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="/assets/back.jpg"
                alt="AI illustration"
                className="w-full max-w-md object-contain"
              />
            </div>
          </>
        ) : (
          // Signup form
          <form
            onSubmit={handleSignup}
            className={`flex flex-col gap-4 ${cardBg} ${cardText} p-8 rounded-lg shadow-lg max-w-md mx-auto w-full`}
          >
            <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              className="p-3 rounded border border-gray-300 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded border border-gray-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`${btnBg} ${btnText} py-3 rounded font-semibold`}
            >
              Sign Up
            </button>
            {message && <p className="mt-2 text-center">{message}</p>}

            <button
              type="button"
              onClick={() => setShowSignup(false)}
              className="mt-4 text-sm underline text-center text-gray-400 hover:text-gray-600"
            >
              Back to Home
            </button>
          </form>
        )}
      </section>
    </>
  );
};

export default HeroSection;
