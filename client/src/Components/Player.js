import React from "react";
import PlayerControls from "./PlayerControls";
import {connect} from "react-redux"

function Player(props){
    if(!props.track){
        return null
    }

    return (
        <div>
            <div>
                <div>{props.track.name}</div>
                <img src={props.track.album.images[2].url} />
                <p>{props.track.album.artists[0].name}</p>
            </div>
            <PlayerControls />
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        track:state.play.track
    }
}


export default connect(mapStateToProps)(Player)