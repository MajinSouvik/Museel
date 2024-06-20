import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import {connect} from "react-redux"

function PlayerControls(props){
    const track = props.track
    const token = props.token
    const playing=props.playing

    if(!token) return 
    
    return (
        <SpotifyPlayer
            token={token}
            showSaveIcon
            callback={state => {
                if (!playing) props.setPlay(false)
            }}
            play={playing}
            uris={track ? [track.uri] : []}
        />
)}

const mapStateToProps=(state)=>{
    return {
        token: state.auth.token,
        playing: state.play.playing,
        track:state.play.track
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setPlay:(play)=>dispatch({type:"PLAY_PAUSE",playing:play})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerControls)