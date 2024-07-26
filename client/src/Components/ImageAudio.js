import AudioPlayer from "./AudioPlayer"
import { useRef ,useEffect, useState} from 'react';

function ImageAudio({ imageSrc, audioSrc }) {
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const handleImageLoad = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    if (imageRef.current) {
      imageRef.current.addEventListener('load', handleImageLoad);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', handleImageLoad);
      }
    };
  }, []);

  return (
    <div className="h-[700px] w-[400px]  rounded-lg">
      <img ref={imageRef} src={imageSrc} className="h-full w-full object-cover snap-start rounded-lg" />
      {/* <AudioPlayer src={audioSrc}/> */}
      <audio ref={audioRef} src={audioSrc} />
      {!isPlaying && (
        <button onClick={()=>handleButtonClick()} style={{ display: 'block', margin: '20px auto' }}>
          Click to Play Audio
        </button>
      )}
    </div>
  );
}

export default ImageAudio