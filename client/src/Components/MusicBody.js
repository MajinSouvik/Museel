// import Song from "./Song"

// function MusicBody({songs}){
//     return(
//         <div>
//             {songs.map(song=>{
//                 return (
//                     <div className="mb-4">
//                         <Song musicId={song.id} name={song.name} artists={song.artists} />
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default MusicBody

import Song from "./Song";

function MusicBody({ songs }) {
    return (
        <div className="mt-4">
            {songs.map((song) => {
                return (
                    <div className="mb-4" key={song.id}>
                        <Song 
                            musicId={song.id} 
                            name={song.name} 
                            artists={song.artists} 
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default MusicBody;
