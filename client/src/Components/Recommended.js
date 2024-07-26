import Song from "./Song"

function Recommended({recommended}){
    return(
        <div>
            {recommended.map(song=>{
                return (
                    <div className="mb-4">
                        <Song musicId={song.id} name={song.name} artists={song.artists} />
                    </div>
                )
            })}
        </div>
    )
}

export default Recommended