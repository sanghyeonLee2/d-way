import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";
import SignIn from "./routes/SignIn";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
