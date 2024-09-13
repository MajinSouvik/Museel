// import {useDispatch} from "react-redux"
// import {uploadMusic} from "../redux/musicSlice"

// function Song({musicId, name, artists}){
//     const dispatch=useDispatch()

//     const handleChange=()=>{
//         const getSong=()=>{
//             fetch("http://localhost:8000/app/upload-song/"+musicId+"/")
//             .then(resp=>resp.json())
//             .then(data=>{
//                 dispatch(uploadMusic(data))
//             })
//         }
//         getSong()
//     }

//     return(
//         <div onClick={()=>handleChange()}>
//             <p>{name}</p>
//             <p>{artists.join(",")}</p>
//         </div>
//     )
// }

// export default Song

import { useDispatch } from "react-redux";
import { uploadMusic } from "../redux/musicSlice";

function Song({ musicId, name, artists }) {
    const dispatch = useDispatch();

    const handleChange = () => {
        const getSong = () => {
            fetch("http://localhost:8000/app/upload-song/" + musicId + "/")
                .then(resp => resp.json())
                .then(data => {
                    dispatch(uploadMusic(data));
                });
        };
        getSong();
    };

    return (
        <div 
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition duration-300"
            onClick={() => handleChange()}
        >
            {/* Song Info */}
            <div>
                <p className="text-white text-lg font-medium">{name}</p>
                <p className="text-gray-400">{artists.join(", ")}</p>
            </div>

            {/* Play Icon (or another visual indicator if needed) */}
            <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-6.085-3.313A1 1 0 007 8.754v6.492a1 1 0 001.667.856l6.085-3.313a1 1 0 000-1.712z"
                />
            </svg>
        </div>
    );
}

export default Song;
