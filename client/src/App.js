import Reels from "./Components/Reels";
import UploadSong from "./Components/UploadSong";
import {useSelector} from "react-redux"
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const user=useSelector((store)=>store.user)
  return (
    <div className="snap-y grid place-items-center">
        {/* <h1>Hello {user.username}</h1> */}
        <Reels />
        {/* <UploadSong /> */}
    </div>
  )
}

export default App;
