// import { useState, useRef, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import Comments from "./Comments";
// import { uploadAlbum } from "../redux/albumSlice";
// import { uploadMusic } from "../redux/musicSlice";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CommentIcon from "@mui/icons-material/Comment";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";

// function Reel({ name, image, track, musicId, albumId }) {
//   const [clicked, setClicked] = useState(false);
//   const [isMuted, setIsMuted] = useState(false); // State to manage mute/unmute
//   const dispatch = useDispatch();
//   const audioRef = useRef(null);
//   const reelRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   // Intersection Observer to detect when the Reel is in view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.5 }
//     );

//     if (reelRef.current) {
//       observer.observe(reelRef.current);
//     }

//     return () => {
//       if (reelRef.current) {
//         observer.unobserve(reelRef.current);
//       }
//     };
//   }, []);

//   // Play or pause the audio based on visibility
//   useEffect(() => {
//     if (audioRef.current) {
//       if (isVisible) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isVisible]);

//   // Handle mute/unmute functionality
//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleChange = () => {
//     const getAlbum = () => {
//       fetch(`http://localhost:8000/app/album/${albumId}/`)
//         .then((resp) => resp.json())
//         .then((data) => {
//           dispatch(uploadAlbum(data));
//         });
//     };

//     const getSong = () => {
//       fetch(`http://localhost:8000/app/upload-song/${musicId}/`)
//         .then((resp) => resp.json())
//         .then((data) => {
//           dispatch(uploadMusic(data));
//         });
//     };

//     getAlbum();
//     getSong();
//   };

//   return (
//     <div className="flex justify-center items-center w-full h-screen">
//       <div
//         ref={reelRef}
//         className="relative w-[35%] h-[90%] overflow-hidden snap-center rounded-lg shadow-lg"
//         style={{
//           backgroundImage: `url(${image})`,
//           backgroundPosition: 'center',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         {/* Overlay for better visibility of icons and text */}
//         <div className="absolute inset-0 bg-black bg-opacity-30" />

//         {/* Content container */}
//         <div className="relative z-10 w-full h-full flex flex-col justify-between p-5">
//           {/* Top section - can include title or other info */}
//           <div className="text-white text-xl font-bold">{name}</div>

//           {/* Right-centered action icons */}
//           <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-5">
//             <FavoriteBorderIcon sx={{ fontSize: 30, color: "white" }} />
//             <CommentIcon
//               sx={{ fontSize: 30, color: "white" }}
//               onClick={() => setClicked(!clicked)}
//             />
//             <BookmarkBorderIcon sx={{ fontSize: 30, color: "white" }} />
//             {/* Mute/Unmute button */}
//             {isMuted ? (
//               <VolumeOffIcon
//                 sx={{ fontSize: 30, color: "white" }}
//                 onClick={toggleMute}
//               />
//             ) : (
//               <VolumeUpIcon
//                 sx={{ fontSize: 30, color: "white" }}
//                 onClick={toggleMute}
//               />
//             )}
//           </div>
//         </div>

//         {/* Background audio */}
//         <audio ref={audioRef} src={track} loop />

//         {/* Comments Section */}
//         {clicked && <Comments id={musicId} />}
//       </div>
//     </div>
//   );
// }

// export default Reel;
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { uploadAlbum } from "../redux/albumSlice";
import { uploadMusic } from "../redux/musicSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
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

  const handleChange = () => {
    const getAlbum = () => {
      fetch(`http://localhost:8000/app/album/${albumId}/`)
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(uploadAlbum(data));
        });
    };

    const getSong = () => {
      fetch(`http://localhost:8000/app/upload-song/${musicId}/`)
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(uploadMusic(data));
        });
    };

    getAlbum();
    getSong();
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setClicked(!clicked);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Link to="/music" className="w-[35%] h-[90%]" onClick={handleChange}>
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

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-5">
              <FavoriteBorderIcon sx={{ fontSize: 30, color: "white" }} />
              <CommentIcon
                sx={{ fontSize: 30, color: "white" }}
                onClick={handleCommentClick}
              />
              <BookmarkBorderIcon sx={{ fontSize: 30, color: "white" }} />
              {isMuted ? (
                <VolumeOffIcon
                  sx={{ fontSize: 30, color: "white" }}
                  onClick={toggleMute}
                />
              ) : (
                <VolumeUpIcon
                  sx={{ fontSize: 30, color: "white" }}
                  onClick={toggleMute}
                />
              )}
            </div>
          </div>

          <audio ref={audioRef} src={track} loop />

          {clicked && <Comments id={musicId} />}
        </div>
      </Link>
    </div>
  );
}

export default Reel;