import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";

import { Notfound, Profilepage } from "./pages";
import { store } from "./app/store";
import App from "./App";

const router = Router([
  {
    path: "/",
    element: <App />,
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
