import Song from "./Song"

function MusicBody({songs}){
    return(
        <div>
            {songs.map(song=>{
                return (
                    <div className="mb-4">
                        <Song musicId={song.id} name={song.name} artists={song.artists} />
                    </div>
                )
            })}
        </div>
    )
}

export default MusicBody