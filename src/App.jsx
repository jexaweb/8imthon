import { useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Mainlayouts from "./layouts/Mainlayouts";
import Home from "./pages/Home";

import ProtectedRoutes from "./components/ProtectedRoutes";

import { useSelector } from "react-redux";
import Register, { action as RegisterAction } from "./pages/Register";
import Login, { action as LoginAction } from "./pages/Login";

function App() {
  const { user } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <Mainlayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        // 🔹 Keyinchalik qo‘shish uchun:
        // { path: "createtask", element: <CreateTask /> },
        // { path: "task/:id", element: <Task /> },
        // { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
