import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Reels from "./Components/Reels";
import Music from "./Components/Music";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UploadSong from "./Components/UploadSong";
import PrivateRoute from "./Components/PrivateRoute";

function AppRouter() {
  return <RouterProvider router={appRouter} />;
}

const appRouter = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    )
  },

  {
    path:"/music",
    element:(
      <PrivateRoute>
        <Music />
      </PrivateRoute>
    )
  },

  
  {
    path:"/upload",
    element:(
      <PrivateRoute>
        <UploadSong />
      </PrivateRoute>
    )

  }

]);

export default AppRouter;