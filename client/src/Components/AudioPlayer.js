import React, { useRef } from 'react';

function AudioPlayer({ src }) {
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  const handleClick=(e)=>{
    e.preventDefault();
    e.target.muted=!e.target.muted
  }

  return (
    <div className="flex space-x-2">
      <audio 
        ref={audioRef} 
        src={src} 
        onClick={(e)=>handleClick(e)} 
        controls
      />
    </div>
  );
}


export default AudioPlayer;
