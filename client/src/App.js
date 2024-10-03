// import Reels from "./Components/Reels";
// import UploadSong from "./Components/UploadSong";
// import {isAuthenticated} from "./services/authService"
// import axios from "axios";
// import {useState, useEffect} from "react"
// import {useNavigate} from "react-router-dom"
// axios.defaults.withCredentials = true;

// function App() {
//   const [isAuth, setIsAuth] = useState(false);
//   const navigate=useNavigate()

//   useEffect(()=>{
//     console.log("Inside App");
    
//     if(isAuthenticated()){
//       setIsAuth(true)
//     }
//   },[])

//   if (!isAuth) {
//     navigate("/login");
//   }

//   return (
//     <div className="snap-y grid place-items-center">
//         {/* <h1>Hello {user.username}</h1> */}
//         <Reels />
//     </div>
//   )
// }

// export default App;

import Reels from "./Components/Reels";
import { isAuthenticated } from "./services/authService";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.withCredentials = true;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Inside App");

    if (isAuthenticated()) {
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) {
    navigate("/login");
  }

  return (
    <>
      {/* Button to upload a song positioned at the top-left, outside <Reels /> */}
      <Link
        to="/upload"
        className="fixed top-4 left-4 bg-blue-500 text-white py-2 px-4 rounded shadow-lg z-50 "
      >
        Upload a Song
      </Link>

      <div className="snap-y grid place-items-center min-h-screen">
        <Reels />
      </div>
    </>
  );
}

export default App;



