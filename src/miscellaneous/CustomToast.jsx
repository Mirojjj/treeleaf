import React from "react";
import { toast } from "react-toastify";

const CustomToast = ({ message }) => (
  <div>
    <strong>Notification:</strong> {message}
  </div>
);

export const showToast = (message) => {
  toast(<CustomToast message={message} />, {
    position: "bottom",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
