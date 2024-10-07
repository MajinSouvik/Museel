import Reels from "./Components/Reels";
import {Link } from "react-router-dom";

function App() {
  return (
    <>
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



