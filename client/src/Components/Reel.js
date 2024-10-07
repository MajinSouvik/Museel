import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { uploadAlbum } from "../redux/albumSlice";
import { uploadMusic } from "../redux/musicSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import api from "../utils/api"; 
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

function Reel({ name, image, track, musicId, albumId }) {
  const [clicked, setClicked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const reelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (reelRef.current) {
      observer.observe(reelRef.current);
    }

    return () => {
      if (reelRef.current) {
        observer.unobserve(reelRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isVisible) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isVisible]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleChange = async () => {
    try {
      // Get album data using the Axios instance
      const albumResponse = await api.get(`app/album/${albumId}/`);
      dispatch(uploadAlbum(albumResponse.data));

      // Get song data using the Axios instance
      const songResponse = await api.get(`app/upload-song/${musicId}/`);
      dispatch(uploadMusic(songResponse.data));
    } catch (error) {
      console.error("Error fetching album or song data:", error);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setClicked(!clicked);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen relative">
      <div className="relative w-[35%] h-[90%]">
        <Link to="/music" className="block w-full h-full" onClick={handleChange}>
          <div
            ref={reelRef}
            className="relative w-full h-full overflow-hidden snap-center rounded-lg shadow-lg cursor-pointer"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-5">
              <div className="text-white text-xl font-bold">{name}</div>
            </div>

            <audio ref={audioRef} src={track} loop />
          </div>
        </Link>

   
        <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 flex flex-col items-center space-y-5 z-20">
          <FavoriteBorderIcon 
            sx={{ fontSize: 30, color: "black", cursor: "pointer" }} 
            onClick={stopPropagation} 
          />
          <CommentIcon
            sx={{ fontSize: 30, color: "black", cursor: "pointer" }}
            onClick={handleCommentClick}
          />
          <BookmarkBorderIcon 
            sx={{ fontSize: 30, color: "black", cursor: "pointer" }} 
            onClick={stopPropagation} 
          />
          {isMuted ? (
            <VolumeOffIcon
              sx={{ fontSize: 30, color:"black", cursor: "pointer" }}
              onClick={toggleMute}
            />
          ) : (
            <VolumeUpIcon
              sx={{ fontSize: 30, color: "black", cursor: "pointer" }}
              onClick={toggleMute}
            />
          )}
        </div>

   
        {clicked && (
          <div className="absolute top-1/2 right-[-380px] transform -translate-y-3/4 z-30">
            <Comments id={musicId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Reel;


