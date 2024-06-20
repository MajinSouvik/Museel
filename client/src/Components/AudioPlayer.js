import React, { useRef } from 'react';

function AudioPlayer({ src }){
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <audio ref={audioRef} src={src} controls />
      <div>
        <button onClick={playAudio}>Play</button>
        <button onClick={pauseAudio}>Pause</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
