import React, { useRef, useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function AudioPlayer({ src, image }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX; // Where the user clicked on the progress bar
    const totalWidth = progressBar.clientWidth; // Width of the progress bar
    const clickProgress = (clickPosition / totalWidth) * audioRef.current.duration; // Calculate the clicked time based on the total duration
    audioRef.current.currentTime = clickProgress; // Set the audio current time
    setProgress((clickPosition / totalWidth) * 100); // Update the progress bar visually
  };

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  return (
    <div className="flex items-center p-4 bg-gray-900 rounded-lg shadow-md space-x-4">
      {/* Album Image */}
      <img
        src={image}
        alt="Album Art"
        className="w-16 h-16 object-cover rounded-md"
      />

      {/* Play/Pause Button and Progress */}
      <div className="flex flex-col justify-center items-center w-full space-y-2">
        {/* Custom Play/Pause Button above the progress bar */}
        <button
          className="text-white bg-green-500 p-2 rounded-full hover:bg-green-400 transition duration-300"
          onClick={togglePlayPause}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>

        {/* Progress Bar (with onClick to allow skipping) */}
        <div
          className="w-full h-1 bg-gray-700 rounded-full overflow-hidden relative cursor-pointer"
          onClick={handleProgressClick} // Handle the progress click for skipping
        >
          <div
            className="h-full bg-green-500 absolute top-0 left-0"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={src} className="hidden" />
    </div>
  );
}

export default AudioPlayer;
