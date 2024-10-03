import { useSelector } from 'react-redux';
import AudioPlayer from "./AudioPlayer";
import MusicHeader from './MusicHeader';
import MusicBody from "./MusicBody";
import Search from './Search';
import useGetAllAlbums from '../hooks/useGetAllAlbums';
import Albums from './Albums';

function Music() {
    const albums = useSelector((store) => store.album.allAlbums);
    const album = useSelector((store) => store.album.album);
    const music = useSelector((store) => store.music.music);

    useGetAllAlbums();

    if (Object.keys(album).length === 0)
        return <h1 className="text-center text-2xl mt-20">No Album Found</h1>;
    if (Object.keys(music).length === 0)
        return <h1 className="text-center text-2xl mt-20">No Music Available</h1>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <Search />
            <div className="grid grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="col-span-1 bg-gray-800 p-4 rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Browse Albums</h2>
                    <Albums albums={albums} />
                </div>

                {/* Main Content */}
                <div className="col-span-3 flex flex-col h-screen">
                    <MusicHeader image={album.image} title={album.name} />
                    <div className="flex-grow mt-6 overflow-y-auto custom-scrollbar">
                        <p className="text-lg font-semibold">Tracks</p>
                        <MusicBody songs={album.songs} />
                    </div>
                </div>
            </div>

            {/* Sticky Audio Player */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
                <AudioPlayer src={music.tracks[0]} image={music.images[0]} />
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #4a5568;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

export default Music;


