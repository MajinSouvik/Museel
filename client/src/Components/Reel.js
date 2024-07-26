import {useState} from "react"
import AudioPlayer from "./AudioPlayer"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import ImageAudio from "./ImageAudio"
import Comments from "./Comments"
import {uploadAlbum} from "../redux/albumSlice"
import {uploadMusic} from "../redux/musicSlice"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Reel({name,image,track,musicId,albumId}){
    const [clicked, setClicked]=useState(false)
    const dispatch=useDispatch()

    const handleChange=()=>{
        const getAlbum=()=>{
            fetch("http://localhost:8000/app/album/"+albumId+"/")
            .then(resp=>resp.json())
            .then(data=>{
                console.log("ALBUM-data-->",data)
                dispatch(uploadAlbum(data))
            })
        }

        const getSong=()=>{
            fetch("http://localhost:8000/app/upload-song/"+musicId+"/")
            .then(resp=>resp.json())
            .then(data=>{
                dispatch(uploadMusic(data))
            })
        }

        getAlbum()
        getSong()
    }

    return (
        <div className="px-1 flex justify-between relative w-[50%] h-full snap-start " onClick={handleChange}>
            <div className="w-full h-full object-fill">
                <Link to='/music'>
                    <img className="w-full h-full rounded-[20px]" src={image} />
                </Link>
            </div>

            <div className="flex flex-col justify-end space-y-16">
                <FavoriteBorderIcon sx={{ fontSize: 30 }}/>
                <CommentIcon sx={{ fontSize: 30 }} 
                    onClick={()=>setClicked(!clicked)}
                />
                <BookmarkBorderIcon sx={{ fontSize: 30 }}/>
            </div>

            {clicked && <Comments id={musicId} />}
        </div>
    )
}

export default Reel