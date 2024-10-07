function MusicHeader({ image, title, totalSongs = 5 }) {
    return (
        <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md">
      
            <img
                src={image}
                alt={title}
                className="w-24 h-24 rounded-lg shadow-lg object-cover mr-6"
            />
            
    
            <div className="text-white">
                <p className="text-sm uppercase text-gray-400">Album</p>
                <p className="text-3xl font-semibold">{title}</p>
                <p className="text-gray-400 mt-1">{totalSongs} Songs</p>
            </div>
        </div>
    );
}

export default MusicHeader;
