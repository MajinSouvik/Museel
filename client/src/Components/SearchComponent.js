import {useState, useEffect} from "react"
import Song from "./Song"
import Player from "./Player"
import useAuth from "./useAuth"
import {connect} from "react-redux"

function SearchComponent(props){
    // if(!props.token) return
    const token=props.token
    
    const [artist, setArtist]=useState("")
    const [artistState, setArtistState] = useState({
        name: "",
        image:-0,
        followers: -1,
        genres:[]
    })
    const [playingTrack, setPlayingTrack]=useState()

    const [songState, setSongState]=useState([])

    function chooseTrack(track){
        setArtist("")
        // setPlayingTrack(track)
        props.currTrack(track)
    }

    useEffect(()=>{
        // console.log("TTOKKNE", token)
        if(!artist) return setArtist("")
        if(!token) return

        var artistParams={
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
        }

        fetch('https://api.spotify.com/v1/search?q='+artist+'&type=artist', artistParams)
        .then(resp=>resp.json())
        .then(data=>{
        
            let item=data.artists.items[0]
            let artistID=item.id
            
            fetch("https://api.spotify.com/v1/artists/"+artistID+'/top-tracks', artistParams)
            .then(resp=>resp.json())
            .then(data=>{
                let songsDetails=[]
                let tracks = data.tracks;
                // console.log("here songd DBZ-->",tracks)
                
                tracks.forEach(track=>{
                    songsDetails.push(track)
                })
                setSongState(songsDetails)
            })

            setArtistState({...artistState, 
                name:item.name, 
                image:item.images[2].url,
                genres:item.genres,
                followers:item.followers.total
            })           
        })
            .catch(err=>{
                console.log(console.error)
            })
    },[artist,token])


    console.log("--->",songState)
    return(
        <div>
            <div className="flex items-center max-w-md mx-auto bg-gray-800 rounded-full px-4 py-2">
                <input type="text" placeholder="Search for Artists, Genres, Music..." className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none" onChange={(e)=>setArtist(e.target.value)} />
            </div>

            <div className="flex space-x-4">
                <div>
                    <img src={artistState.image} alt="namaz" />
                    <p>{artistState.name}</p>
                    <p>{artistState.followers}</p>
                    {
                        artistState.genres.map(genre=>{
                            return <p>{genre}</p>
                        })
                    }
                </div>
                
                <div>
                    {
                        songState.map(song=>{
                            return (<Song
                                    track={song} 
                                    chooseTrack={chooseTrack}
                                    token={token}
                                    />)
                        })
                    }
                </div>
                
            </div>
            
            <Player />
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        token:state.auth.token,
        track:state.play.track
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        currTrack:(track)=>dispatch({type:"TRACK", payload:track})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchComponent);