import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {upload} from "../redux/reelSlice"
import Reel from "./Reel"

function Reels(){
    const reels=useSelector((store)=>store.reels.reels)
    const dispatch = useDispatch()

    useEffect(()=>{
        const getReels=()=>{
            fetch("http://localhost:8000/app/upload-song/")
            .then(resp=>resp.json())
            .then(data=>{
                dispatch(upload(data))
            })
        }
        getReels()
    },[])

    return (
    <div className="relative left-[220px] h-[95vh] w-[100%] rounded-[20px] max-w-[1000px] max-h-[1200px] overflow-scroll snap-y no-scrollbar ">
        {
            reels.map(reel=>{
                return(
                    <Reel 
                        musicId={reel.id}
                        albumId={reel.album}
                        name={reel.name} 
                        image={reel.images[0]} 
                        track={reel.tracks[1]} 
                    />
            )})
        }
    </div>)
}

export default Reels