import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import api from "../utils/api"; 

const UploadSong = () => {
  const [albumFolder, setAlbumFolder] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleAlbumFolderChange = (e) => {
    setAlbumFolder(e.target.files); 
  };

  
  const uploadFileToFirebase = async (file, path) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`; 
    const fileRef = ref(storage, `${path}/${uniqueFileName}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

 
  const extractArtistsFromFile = async (artistsFile) => {
    try {
      const text = await artistsFile.text();
      const cleanText = text.replace(/[\[\]]/g, ""); 
      const artistList = cleanText.split(",").map((artist) => artist.trim());
      return artistList;
    } catch (error) {
      console.error("Error parsing artist list:", error);
      return [];
    }
  };

  
  const organizeFilesBySong = () => {
    const organizedFiles = {};
    if (!albumFolder) return organizedFiles;

    const albumName = albumFolder[0].webkitRelativePath.split("/")[0]; 
    for (let i = 0; i < albumFolder.length; i++) {
      const file = albumFolder[i];
      const pathSegments = file.webkitRelativePath.split("/");

      
      if (file.name.includes("album")) {
        organizedFiles["albumImage"] = file;
        continue;
      }

      const songName = pathSegments[1]; 

      if (!organizedFiles[songName]) {
        organizedFiles[songName] = {};
      }

      
      if (file.name.includes("image1")) {
        organizedFiles[songName].image1 = file;
      } else if (file.name.includes("image2")) {
        organizedFiles[songName].image2 = file;
      } else if (file.name.includes("orig")) {
        organizedFiles[songName].orig = file;
      } else if (file.name.includes("trim")) {
        organizedFiles[songName].trim = file;
      } else if (file.name === "artists.txt") {
        organizedFiles[songName].artistsFile = file;
      }
    }

    return { organizedFiles, albumName }; 
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { organizedFiles, albumName } = organizeFilesBySong();

     
      const albumImage = organizedFiles["albumImage"];
      const albumImageUrl = albumImage
        ? await uploadFileToFirebase(albumImage, "albumImages")
        : "";

   
      for (const songName in organizedFiles) {
        if (songName === "albumImage") continue; 

        const { image1, image2, orig, trim, artistsFile } = organizedFiles[songName];

    
        const image1Url = image1 ? await uploadFileToFirebase(image1, "images") : "";
        const image2Url = image2 ? await uploadFileToFirebase(image2, "images") : "";
        const trackUrl = orig ? await uploadFileToFirebase(orig, "tracks") : "";
        const previewTrackUrl = trim ? await uploadFileToFirebase(trim, "previewTracks") : "";

      
        const artists = artistsFile ? await extractArtistsFromFile(artistsFile) : [];

     
        const backendData = {
          name: songName, 
          imgUrl1: image1Url,
          imgUrl2: image2Url,
          image: albumImageUrl,
          trackUrl: trackUrl,
          previewUrl: previewTrackUrl,
          artists,
          album: albumName, 
        };

       
        const resp = await api.post("app/upload-song/", backendData);
        console.log("resp-->", resp);
      }

      alert("Album uploaded successfully!");
    } catch (error) {
      console.error("Error uploading album:", error);
      alert("Failed to upload album.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <label className="flex flex-col mb-4">
          <span className="mb-2 font-medium">Upload Album Folder</span>
          <input
            type="file"
            name="albumFolder"
            webkitdirectory="true"
            directory="true"
            onChange={handleAlbumFolderChange}
            required
            className="p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Uploading..." : "Upload Album"}
        </button>
      </form>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UploadSong;
