import {useSelector} from 'react-redux';
import AudioPlayer from "./AudioPlayer"
import MusicHeader from './MusicHeader';
import MusicBody from "./MusicBody";
import Search from './Search';
import Result from './Result';

function Music(props){
    const album=useSelector((store)=>store.album.album)
    const music=useSelector((store)=>store.music.music)

    if(Object.keys(album).length===0)return <h1>No Album</h1>
    if(Object.keys(music).length===0)return <h1>No Music</h1>

    return(
        <div>
            <Search />
            <Result />
            <MusicHeader image={album.image} title={album.name} />
            <p className="mt-6">Tracks</p>
            <MusicBody songs={album.songs} />
            <AudioPlayer src={music.tracks[0]} />
        </div>
    )
}

export default Music