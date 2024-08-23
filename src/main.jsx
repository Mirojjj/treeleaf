import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter as Router,
} from "react-router-dom";

import { Homepage, Notfound, Profilepage } from "./pages";

const router = Router([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/profiles",
    element: <Profilepage />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
