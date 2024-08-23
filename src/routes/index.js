import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Homepage, Profilepage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/profiles",
    element: <Profilepage />,
  },
]);

export default router;
