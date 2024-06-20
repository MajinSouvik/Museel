import React from "react"
import { Button } from "@mui/material"

// const AUTH_URL="https://accounts.spotify.com/authorize?client_id=89798a818e114cf8bba2a7f4cfe2d83c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function Login(){
    const getAuthUrl=()=>{
        fetch("http://localhost:8000/spotify/auth-url")
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data.url)
            window.location.replace(data.url)
        })
        .catch(err=>console.log(err))
    }

    return (<Button onClick={()=>getAuthUrl()}>login</Button>)
}

export default Login
