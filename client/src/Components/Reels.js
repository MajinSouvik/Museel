import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { upload } from "../redux/reelSlice";
import Reel from "./Reel";

function Reels() {
  const reels = useSelector((store) => store.reels.reels);
  const dispatch = useDispatch();

  useEffect(() => {
    const getReels = () => {
      fetch("http://localhost:8000/app/upload-song/")
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Reels-->",data)
          dispatch(upload(data));
        });
    };
    getReels();
  }, [dispatch]);

  return (
    <div className="relative h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {reels.map((reel, index) => {
        return (
          <Reel
            key={index}
            musicId={reel.id}
            albumId={reel.album}
            name={reel.name}
            image={reel.images[0]}
            track={reel.tracks[1]} 
          />
        );
      })}
    </div>
  );
}

export default Reels;
