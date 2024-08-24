import React from "react";
import { Homepage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //

const App = () => {
  return (
    <div className=" bg-gray-100">
      <Homepage />
      <ToastContainer />
    </div>
  );
};

export default App;
