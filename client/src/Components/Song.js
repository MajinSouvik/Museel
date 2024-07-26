import {useDispatch} from "react-redux"
import {uploadMusic} from "../redux/musicSlice"

function Song({musicId, name, artists}){
    const dispatch=useDispatch()

    const handleChange=()=>{
        const getSong=()=>{
            fetch("http://localhost:8000/app/upload-song/"+musicId+"/")
            .then(resp=>resp.json())
            .then(data=>{
                dispatch(uploadMusic(data))
            })
        }
        getSong()
    }

    return(
        <div onClick={()=>handleChange()}>
            <p>{name}</p>
            <p>{artists.join(",")}</p>
        </div>
    )
}

export default Song
