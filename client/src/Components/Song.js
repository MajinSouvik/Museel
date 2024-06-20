import React from "react";

function Song({track,token, chooseTrack}){
    // console.log(track.id)
    function handlePlay(){
        console.log("clicked track !")
        let params={
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                "id":track.id
            })
        }

        fetch("http://localhost:8000/spotify/upload-track",params)
        .then(resp=>resp.json())
        .then(data=>console.log(data))
        
        // chooseTrack(track)
    }

    return (
        <div onClick={handlePlay}>{track.name}</div>
        // <div onClick={handlePlay}>
        //     <div className="flex">
        //         <img src={image.url} height={image.height} width={image.width} />
        //         <div>
        //             <p>{name}</p>
                    
        //             <div className="flex space-x-2">
        //                 {singers.map(singer => {
        //                     return <p>{singer},</p>
        //                 })}
        //             </div>
        //         </div>
        //     </div>
            
        //     <p>{duration}</p>
            
        // </div>
    )
}

export default Song