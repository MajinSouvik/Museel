import {useEffect,useState} from 'react';
import axios from 'axios';

function useAuth(code){
    console.log("auth ei achi")
    const [accessToken, setAccessToken]=useState(undefined)
    const [refreshToken, setRefreshToken]=useState("")
    const [expiresIn,setExpiresIn]=useState("")

    useEffect(()=>{
        console.log("here auth")
        axios.post("http://localhost:8000/spotify/login",{
            code
        })
        .then(resp=>{
            setAccessToken(resp.data.response.access_token)
            setRefreshToken(resp.data.response.refresh_token)
            setExpiresIn(resp.data.response.expires_in)
            window.history.pushState({},null,"/")
        })
        .catch(err=>{
            // console.log(err)
            console.log("ERROR in auth--->",err)
            window.location="/"
        }) 
    },[code])

    useEffect(()=>{
        console.log("rudr")
        if (!refreshToken || !expiresIn) return
        
        const interval=setInterval(()=>{
            axios.post("http://localhost:8000/spotify/refresh",{
                refreshToken
            })
            .then(resp=>{
                
                setAccessToken(resp.data.response.access_token)
                setExpiresIn(resp.data.response.expires_in)
                window.history.pushState({},null,"/") 
            })
            .catch(err=>{
                window.location="/"
            })
        },(expiresIn-60)*1000)

        return ()=>clearInterval(interval)
    },[refreshToken, expiresIn])

    return accessToken
}

export default useAuth