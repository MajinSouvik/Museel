import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlbums } from "../redux/albumSlice";
import api from "../utils/api";

function useGetAllAlbums() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await api.get("app/album/");
        dispatch(setAlbums(response.data));
      } catch (error) {
      }
    };

    getAll();
  }, []);
}

export default useGetAllAlbums;
