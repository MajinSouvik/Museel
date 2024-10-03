import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import the UUID function

const UploadSong = () => {
  const [albumFolder, setAlbumFolder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle album folder upload
  const handleAlbumFolderChange = (e) => {
    setAlbumFolder(e.target.files); // Set the entire folder content (with all subfolders and files)
  };

  // Helper function to upload files to Firebase and return the download URL
  const uploadFileToFirebase = async (file, path) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`; // Generate a unique file name using uuid
    const fileRef = ref(storage, `${path}/${uniqueFileName}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  // Function to extract artist list from the "artists.txt" file if applicable
  const extractArtistsFromFile = async (artistsFile) => {
    try {
      const text = await artistsFile.text();
      const cleanText = text.replace(/[\[\]]/g, ""); // Clean up the artist string if needed
      const artistList = cleanText.split(",").map((artist) => artist.trim());
      return artistList;
    } catch (error) {
      console.error("Error parsing artist list:", error);
      return [];
    }
  };

  // Organize uploaded files by their song folder
  const organizeFilesBySong = () => {
    const organizedFiles = {};
    if (!albumFolder) return organizedFiles;

    const albumName = albumFolder[0].webkitRelativePath.split("/")[0]; // Top-level folder is the album name
    for (let i = 0; i < albumFolder.length; i++) {
      const file = albumFolder[i];
      const pathSegments = file.webkitRelativePath.split("/");

      // If this is the album image (located in the root folder)
      if (file.name.includes("album")) {
        organizedFiles["albumImage"] = file;
        continue; // Skip to the next file since it's the album image
      }

      const songName = pathSegments[1]; // Subfolder (song) name

      if (!organizedFiles[songName]) {
        organizedFiles[songName] = {}; // Create an object for each song
      }

      // Organize files for each song by their type
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

    return { organizedFiles, albumName }; // Return both organized files and album name
  };

  // Handle form submission and upload process
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { organizedFiles, albumName } = organizeFilesBySong();

      // Upload the album image only once
      const albumImage = organizedFiles["albumImage"];
      const albumImageUrl = albumImage
        ? await uploadFileToFirebase(albumImage, "albumImages")
        : "";

      // Loop through each song and upload its associated files
      for (const songName in organizedFiles) {
        if (songName === "albumImage") continue; // Skip the album image entry

        const { image1, image2, orig, trim, artistsFile } = organizedFiles[songName];

        // Upload files to Firebase and get URLs
        const image1Url = image1 ? await uploadFileToFirebase(image1, "images") : "";
        const image2Url = image2 ? await uploadFileToFirebase(image2, "images") : "";
        const trackUrl = orig ? await uploadFileToFirebase(orig, "tracks") : "";
        const previewTrackUrl = trim ? await uploadFileToFirebase(trim, "previewTracks") : "";

        // Extract artists if there is an artists.txt file
        const artists = artistsFile ? await extractArtistsFromFile(artistsFile) : [];

        // Prepare the data to send to the backend
        const backendData = {
          name: songName, // Song name is the subfolder name
          imgUrl1: image1Url,
          imgUrl2: image2Url,
          image: albumImageUrl, // Reuse the same album image for all songs
          trackUrl: trackUrl,
          previewUrl: previewTrackUrl,
          artists,
          album: albumName, // Album name is the top-level folder
        };

        // Send the song data to the backend API
        const resp = await axios.post("http://localhost:8000/app/upload-song/", backendData);
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












