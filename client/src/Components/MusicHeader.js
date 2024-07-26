
function MusicHeader({image, title,totalSongs=5}){
    return(
        <div className="flex">
            <img src={image} />
            <div className="mt-auto">
                <p>Album</p>
                <p className="text-3xl">{title}</p>
            </div>
        </div>
    )
}

export default MusicHeader