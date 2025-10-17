import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register, { action as RegisterAction } from "./pages/Register";
import Login, { action as LoginAction } from "./pages/Login";
//pages
import Home from "./pages/Home";
import Mainlayouts from "./layouts/Mainlayouts";
import { isAuthReady, login } from "./app/features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import CreateRecipe from "./pages/CreateRecipe";
import Recipes from "./pages/Recipes";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
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
        {
          path: "/createrecipe",
          element: <CreateRecipe />,
        },
        {
          path: "recipes",
          element: <Recipes />,
        },
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      }

      dispatch(isAuthReady());
    });
  }, [dispatch]);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
