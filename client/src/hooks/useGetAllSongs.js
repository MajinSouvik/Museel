import { useEffect } from "react"
import {useDispatch} from "react-redux"
import { setSongs} from "../redux/musicSlice";
import api from "../utils/api";

function useGetAllSongs(){
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await api.get("app/upload-song/");
        dispatch(setSongs(response.data))
      } catch (error) {
      }
    };

    getAll();
  }, []);
}

export default useGetAllSongs