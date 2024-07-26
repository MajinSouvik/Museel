import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from "./App"
import Reels from "./Components/Reels"
import Music from "./Components/Music"
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import PrivateRoute from "./Components/PrivateRoute"

function AppRouter(){
    return(
        <RouterProvider router={appRouter} />
    )
}

  const appRouter=createBrowserRouter([
      {
        path:"/signup",
        element:<SignUp />
      },

      {
        path:"/login",
        element:<Login />
      },

      {
        path:"/",
        element:<PrivateRoute />,

        children:[
          {
            path:"/",
            element:<App />
          },

          {
            path:"/music",
            element:<Music />
          }
        ]

      }
  ])

  

// const appRouter=createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,

//         children: [
//           {
//             path: '/',
//             element: <Reels />,
//           },
          
//           {
//             path: '/music',
//             element: <Music />,
//           },

//           {
//             path: '/signup',
//             element: <SignUp />,
//           },

//           {
//             path: '/login',
//             element: <Login />,
//           },
//         ]
//       }
// ])

export default AppRouter