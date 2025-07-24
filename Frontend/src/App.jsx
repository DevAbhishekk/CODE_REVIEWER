import React, { useState } from "react";
import HeroSection from "./HeroSection";
import CodeReview from "./CodeReview";
import Navbar from "./Navbar";
import Auth from "./components/Auth"; // Ensure the path matches your structure

function App() {
  const [step, setStep] = useState("hero"); // 'hero' | 'auth' | 'editor'

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {step !== "editor" && <Navbar />}

      {step === "hero" && (
        <HeroSection onOpenApp={() => setStep("auth")} />
      )}

      {step === "auth" && (
        <Auth onAuthSuccess={() => setStep("editor")} />
      )}

      {step === "editor" && <CodeReview />}
    </div>
  );
}

export default App;
