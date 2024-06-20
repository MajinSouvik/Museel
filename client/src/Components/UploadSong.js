import { useState } from "react"
import {storage} from "../firebase"
import {v4} from "uuid"
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

function UploadSong(){
    const [track, setTrack] = useState(null);
    const [preview, setPreview] = useState(null);
    const [img1, setImage1]=useState(null)
    const [img2, setImage2]=useState(null)
    const [trackUrl, setTrackUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imgUrl1, setImageUrl1]=useState(null)
    const [imgUrl2, setImageUrl2]=useState(null)
    const [name,setName]=useState(null)

    const isPossible=()=>{
        if(track===null || preview===null || name===null || img1===null || img2===null){
            return false
        }
        return true
    }

    const isReallyPossible=()=>{
        console.log("He;llo")
        console.log("trackUrl--->", trackUrl)
        console.log("previewUrl--->", previewUrl)
        console.log("name-->", name)
        console.log("imgUrl1--->", imgUrl1)
        console.log("imgUrl2--->", imgUrl2)
        
        if(trackUrl===null || previewUrl===null || name===null || imgUrl1===null || imgUrl2===null){
            return false
        }
        return true
    }
    
    const uploadFile=(e)=>{
        e.preventDefault();
        if(isPossible()){
            helper(track,"track")
            helper(preview,"preview")
            helper(img1,"img1")
            helper(img2,"img2")

            if(isReallyPossible()){
                console.log("API gets called !!")
                API_CALL()
            }
        }
    }

    const API_CALL=()=>{
        let params={
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imgUrl1,
                imgUrl2,
                trackUrl,
                previewUrl,
                name
              })
        }

        fetch("http://localhost:8000/app/upload",params)
        .then(resp=>resp.json())
        .then(data=>console.log(data))
    }

    const helper=(file,type)=>{
        const imageRef=ref(storage,`files/${file.name+v4()}`)
        uploadBytes(imageRef,file).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                if(type==="track"){
                    setTrackUrl(url)
                }else if(type==="preview"){
                    setPreviewUrl(url)
                }else if(type==="img1"){
                    setImageUrl1(url)
                }else{
                    setImageUrl2(url)
                }
            })
            alert("File uploaded !!")
        })
    }


    return(
        <form>
            <label>Song:</label>
            <input type="text" placeholder="write song name" onChange={(e)=>setName(e.target.value)}/>
            <br />
            <label>Image1:</label>
            <input type="file" onChange={(e)=>setImage1(e.target.files[0])} />
            <br />
            <label>Image2:</label>
            <input type="file" onChange={(e)=>setImage2(e.target.files[0])}/>
            <br />
            <label>Track:</label>
            <input type="file" onChange={(e)=>setTrack(e.target.files[0])} />
            <br />
            <label>Preview:</label>
            <input type="file" onChange={(e)=>setPreview(e.target.files[0])}/>
            <br />
            <button onClick={(e)=>uploadFile(e)}>Upload</button>
        </form>
    )
}

export default UploadSong