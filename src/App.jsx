import React, { useState, useEffect } from "react";
import { Homepage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./miscellaneous";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // Show loader on first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      // Skip loader on subsequent visits
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="bg-gray-100">
      {isLoading ? <Loader /> : <Homepage />} <ToastContainer />
    </div>
  );
};

export default App;
