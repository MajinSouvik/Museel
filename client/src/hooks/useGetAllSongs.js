import { useEffect } from "react"
import {useDispatch} from "react-redux"
import axios from "axios"
import { setSongs} from "../redux/musicSlice";
import {API} from "../utils/constants"
axios.defaults.withCredentials = true;

function useGetAllSongs(){
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(API+"app/upload-song/");
        dispatch(setSongs(response.data))
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAll();
  }, []);
}

export default useGetAllSongs