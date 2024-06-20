import {useEffect,useState} from "react"
import AudioPlayer from "./AudioPlayer"

function Reels(props){
    const [image, setImage]=useState(null)
    const [audioLink,setAudioLink]=useState(null)
    const [name,setName]=useState(null)

    useEffect(()=>{
        const getReels=()=>{
            fetch("http://localhost:8000/app/load")
            .then(resp=>resp.json())
            .then(data=>{
                console.log(data)
                setImage(data.imgUrl1)
                setAudioLink(data.previewUrl)
                setName(data.name)
            })
        }
        getReels()
    })
    
    return (
    <div onClick={()=>console.log("Hey u are doing great!")}>
        <h1>Reels!</h1>
        <AudioPlayer src={audioLink} />
        <img src={image} alt="Habibi"/>
    </div>)
}


export default Reels