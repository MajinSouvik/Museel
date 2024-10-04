import { useEffect } from "react"
import {useDispatch} from "react-redux"
import axios from "axios"
import { setAlbums} from "../redux/albumSlice";
import {API} from "../utils/constants"
axios.defaults.withCredentials = true;

function useGetAllAlbums(){
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(API+"app/album/");
        console.log("album-->", response);
        dispatch(setAlbums(response.data))
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAll();
  }, []);
}

export default useGetAllAlbums