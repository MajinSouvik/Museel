import { useDispatch , useSelector} from "react-redux";
import { uploadAlbum } from "../redux/albumSlice";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import useGetAllSongs from "../hooks/useGetAllSongs";

function Search() {
  const dispatch = useDispatch();
  const songs = useSelector((store)=>store.music.songs);
  const albums=useSelector((store)=>store.album.allAlbums)

  useGetAllAlbums()
  useGetAllSongs()
  
  const handleChange = (name) => {
    
    const helper = () => {
      songs.filter((song) => {
        if (song.name.toLowerCase().includes(name.toLowerCase())) {
          const matchedAlbum = albums.find((album) => album.id === song.album);
          if (matchedAlbum) {
            dispatch(uploadAlbum(matchedAlbum));
          }
        }
        return song.name.toLowerCase().includes(name.toLowerCase());
      });
    };
    helper()
  };


  return (
    <div className="flex items-center max-w-lg mx-auto bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-lg px-6 py-3">
      <input
        type="text"
        placeholder="Search for Artists, Genres, Music..."
        className="flex-1 bg-transparent text-white placeholder-gray-200 outline-none text-lg"
        onChange={(e) => handleChange(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white ml-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 4a4 4 0 014-4h0a4 4 0 014 4v0c0 2-1 3-2 3h-4c-1 0-2-1-2-3zM5 10h14M7 15h10m-4 0v5m-6-5h12"
        />
      </svg>
    </div>
  );
}

export default Search;
