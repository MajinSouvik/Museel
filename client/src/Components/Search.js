import { useState,useEffect } from "react"
import {useDispatch} from "react-redux"
import {uploadResult} from "../redux/resultSlice"

function Search(props){
    const dispatch=useDispatch()
    const [songs,setSongs]=useState([])
    const [albums,setAlbums]=useState([])
    
    useEffect(()=>{
        const getAllSongs=()=>{
            fetch("http://localhost:8000/app/upload-song/")
            .then(resp=>resp.json())
            .then(data=>{
                setSongs(data)
            })
        }

        const getAllAlbums=()=>{
            fetch("http://localhost:8000/app/album/")
            .then(resp=>resp.json())
            .then(data=>{
                setAlbums(data)
            })
        }
        getAllSongs()
        getAllAlbums()
    },[])

    const handleChange=(name)=>{
        const helper=()=>{
            const filteredS=songs.filter((song)=>song.name.includes(name))
            return filteredS
        }
        
        dispatch(uploadResult(helper()))
    }
    return(
        <div className="flex items-center max-w-md mx-auto bg-gray-800 rounded-full px-4 py-2">
            <input type="text" placeholder="Search for Artists, Genres, Music..." className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none" 
                onChange={(e)=>handleChange(e.target.value)}
            />
        </div>
    )
}

export default Search