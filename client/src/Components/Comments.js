import React, { useRef, useEffect, useState } from "react"; 
import { useSelector } from 'react-redux'; 
import { TextareaAutosize } from '@mui/base/TextareaAutosize'; 
import Comment from './Comment';  
import { API } from "../utils/constants";
import axios from "axios";

function Comments({ id }) {   
    const text = useRef(null);   
    const user=useSelector((store)=>store.auth.auth.user)
    const userID=useSelector((store) => store.auth.auth.user.id); 
    
    console.log("user-->", user)  
    const [comments, setComments] = useState([]);    

    useEffect(() => {     
        const getSong = () => {       
            fetch(API+`app/upload-song/${id}/`)         
                .then((resp) => resp.json())         
                .then((data) => {  
                    console.log("Comments-->",data.comments)         
                    setComments(data.comments);         
                })         
                .catch((error) => console.error('Error fetching comments:', error));     
        };     
        getSong();   
    }, [id]);    

    const handleSubmit = async (e) => {     
        e.preventDefault();     
        if (!text.current.value.trim()) return; // Prevent empty comments      
    
        try {       
            const response = await axios.post(API+'app/comment/', {         
                text: text.current.value,           
                songID: id,           
                userID: userID       
            }, {         
                headers: {           
                    'Content-Type': 'application/json'         
                }       
            });        
    
            // If the request is successful, the data will be in `response.data`
            setComments([...comments, response.data]);       
            text.current.value = '';     
        } catch (error) {       
            console.error('There was a problem with the comment submission:', error);     
        }   
    };
        

    return (     
        <div className="relative">       
            {/* Left-pointing arrow */}       
            <div className="absolute top-5 left-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-grey"></div>        

            <div className="w-[300px] h-[400px] bg-white rounded-lg shadow-md flex flex-col p-4 relative z-10">         
                <h2 className="text-lg font-semibold mb-3">Comments</h2>         
                {/* Comment List */}         
                <div className="flex-grow space-y-3 overflow-y-auto mb-3">           
                {comments.map((comment, index) => (
    <div key={index} className="flex items-start space-x-3">
        {/* Circular space for the user's profile picture */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
            {comment.user.profilePic ? (
                <img
                    src={comment.user.profilePic} // Assuming `profilePic` contains the URL to the user's profile picture
                    alt="User profile"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {/* Fallback (e.g., first letter of username) if profilePic is missing */}
                    <span>{comment.user.username[0].toUpperCase()}</span>
                </div>
            )}
        </div>
        
        {/* Comment content */}
        <div className="bg-gray-100 rounded-lg p-2 flex-grow">
            <Comment text={comment} />
        </div>
    </div>
))}
        
                </div>          

                {/* Input Field for adding a comment */}         
                <div className="flex items-center space-x-2">           
                    <TextareaAutosize             
                        ref={text}             
                        placeholder="Add a comment..."             
                        className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none resize-none"             
                        minRows={1}             
                        maxRows={4}           
                    />           
                    <button             
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 text-sm"             
                        onClick={handleSubmit}           
                    >             
                        Post           
                    </button>         
                </div>       
            </div>     
        </div>   
    ); 
}

export default Comments;
