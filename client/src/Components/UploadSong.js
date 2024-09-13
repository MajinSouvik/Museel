import { useState } from "react";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadSong = () => {
  const [formData, setFormData] = useState({
    songName: '',
    image1: null,
    image2: null,
    albumImage: null,
    track: null,
    previewTrack: null,
    artists: '',
    albumName: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const uploadFileToFirebase = async (file, path) => {
    const fileRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        songName,
        image1,
        image2,
        albumImage,
        track,
        previewTrack,
        artists,
        albumName,
      } = formData;

      // Upload files to Firebase
      const image1Url = image1 ? await uploadFileToFirebase(image1, 'images') : '';
      const image2Url = image2 ? await uploadFileToFirebase(image2, 'images') : '';
      const albumImageUrl = albumImage ? await uploadFileToFirebase(albumImage, 'albumImages') : '';
      const trackUrl = track ? await uploadFileToFirebase(track, 'tracks') : '';
      const previewTrackUrl = previewTrack ? await uploadFileToFirebase(previewTrack, 'previewTracks') : '';

      // Prepare data to send to the backend
      const backendData = {
        name: songName,
        imgUrl1: image1Url,
        imgUrl2: image2Url,
        image: albumImageUrl,
        trackUrl: trackUrl,
        previewUrl: previewTrackUrl,
        artists,
        album: albumName
      };

      // Send data to Django backend
      const resp=await axios.post('http://localhost:8000/app/upload-song/', backendData);

      alert('Song uploaded successfully!',resp);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Song Name</span>
        <input
          type="text"
          name="songName"
          placeholder="Enter the name of the song"
          value={formData.songName}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Image 1</span>
        <input
          type="file"
          name="image1"
          accept="image/*"
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <span className="text-sm text-gray-500">Upload a cover image or artwork</span>
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Image 2</span>
        <input
          type="file"
          name="image2"
          accept="image/*"
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <span className="text-sm text-gray-500">Upload an additional image (optional)</span>
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Album Image</span>
        <input
          type="file"
          name="albumImage"
          accept="image/*"
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <span className="text-sm text-gray-500">Upload the album cover image</span>
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Track</span>
        <input
          type="file"
          name="track"
          accept="audio/*"
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <span className="text-sm text-gray-500">Upload the main audio track</span>
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Preview Track</span>
        <input
          type="file"
          name="previewTrack"
          accept="audio/*"
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
        <span className="text-sm text-gray-500">Upload a preview of the track</span>
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Artists</span>
        <input
          type="text"
          name="artists"
          placeholder="Enter the artists' names"
          value={formData.artists}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
      </label>
      <label className="flex flex-col">
        <span className="mb-2 font-medium">Album Name</span>
        <input
          type="text"
          name="albumName"
          placeholder="Enter the album name"
          value={formData.albumName}
          onChange={handleInputChange}
          required
          className="p-2 border rounded"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Uploading...' : 'Upload Song'}
      </button>
    </form>
  );
};

export default UploadSong;






// function UploadSong(){
//     const [track, setTrack] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [img1, setImage1]=useState(null)
//     const [img2, setImage2]=useState(null)
//     const [trackUrl, setTrackUrl] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [imgUrl1, setImageUrl1]=useState(null)
//     const [imgUrl2, setImageUrl2]=useState(null)
//     const [name,setName]=useState(null)
//     const [album, setAlbum]=useState(null)
//     const [albumImage, setAlbumImage]=useState(null)
//     const [albumImageUrl, setAlbumImageUrl]=useState(null)
//     const [artists, setArtists]=useState([])

//     const isPossible=()=>{
//         if(track===null || preview===null || name===null || img1===null || img2===null){
//             return false
//         }
//         return true
//     }

//     const isReallyPossible=()=>{
//         console.log("He;llo")
//         console.log("trackUrl--->", trackUrl)
//         console.log("previewUrl--->", previewUrl)
//         console.log("name-->", name)
//         console.log("imgUrl1--->", imgUrl1)
//         console.log("imgUrl2--->", imgUrl2)
        
//         if(trackUrl===null || previewUrl===null || name===null || imgUrl1===null || imgUrl2===null || albumImage===null){
//             return false
//         }
//         return true
//     }
    
//     const uploadFile=(e)=>{
//         e.preventDefault();
//         if(isPossible()){
//             helper(track,"track")
//             helper(preview,"preview")
//             helper(img1,"img1")
//             helper(img2,"img2")
//             helper(albumImage,"albumImage")

//             if(isReallyPossible()){
//                 console.log("API gets called !!")
//                 API_CALL()
//             }
//         }
//     }

//     const API_CALL=()=>{
//         let params={
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 imgUrl1,
//                 imgUrl2,
//                 trackUrl,
//                 previewUrl,
//                 name,
//                 album,
//                 artists,
//                 image:albumImageUrl
//               })
//         }

//         fetch("http://localhost:8000/app/upload-song/",params)
//         .then(resp=>resp.json())
//         .then(data=>console.log(data))
//     }

//     const helper=(file,type)=>{
//         const imageRef=ref(storage,`files/${file.name+v4()}`)
//         uploadBytes(imageRef,file).then((snapshot)=>{
//             getDownloadURL(snapshot.ref).then((url)=>{
//                 if(type==="track"){
//                     setTrackUrl(url)
//                 }else if(type==="preview"){
//                     setPreviewUrl(url)
//                 }else if(type==="img1"){
//                     setImageUrl1(url)
//                 }else if(type==="img2"){
//                     setImageUrl2(url)
//                 }else{
//                     setAlbumImageUrl(url)
//                 }
//             })
//             alert("File uploaded !!")
//         })
//     }


//     return(
//         <form>
//             <label>Song:</label>
//             <input type="text" placeholder="write song name" onChange={(e)=>setName(e.target.value)}/>
//             <br />
//             <label>Image1:</label>
//             <input type="file" onChange={(e)=>setImage1(e.target.files[0])} />
//             <br />
//             <label>Image2:</label>
//             <input type="file" onChange={(e)=>setImage2(e.target.files[0])}/>
//             <br />
//             <label>AlbumImage:</label>
//             <input type="file" onChange={(e)=>setAlbumImage(e.target.files[0])}/>
//             <br />
//             <label>Track:</label>
//             <input type="file" onChange={(e)=>setTrack(e.target.files[0])} />
//             <br />
//             <label>Preview:</label>
//             <input type="file" onChange={(e)=>setPreview(e.target.files[0])}/>
//             <br />
//             <label>Artists:</label>
//             <input type="text" placeholder="Artists" onChange={(e)=>setArtists(e.target.value)}/>
//             <br />
//             <label>Album:</label>
//             <input type="text" placeholder="Album" onChange={(e)=>setAlbum(e.target.value)}/>
//             <br />
//             <button onClick={(e)=>uploadFile(e)}>Upload</button>
//         </form>
//     )
// }

// export default UploadSong