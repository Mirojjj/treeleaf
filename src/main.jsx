import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";

import { Homepage, Notfound, Profilepage } from "./pages";
import { store } from "./app/store";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
