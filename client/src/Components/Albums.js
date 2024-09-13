import { uploadAlbum } from "../redux/albumSlice";
import { useDispatch } from "react-redux";

function Albums({ albums }) {
  const dispatch = useDispatch();

  const handleChange = (album) => {
    dispatch(uploadAlbum(album));
  };

  return (
    <ul className="space-y-2">
      {albums.map((album, index) => (
        <li
          key={index}
          className="mb-2 text-white bg-gray-800 rounded-md px-4 py-2 shadow cursor-pointer"
          onClick={() => handleChange(album)}
        >
          {album.name}
        </li>
      ))}
    </ul>
  );
}

export default Albums;
