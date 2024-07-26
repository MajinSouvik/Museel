import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useRef, useEffect, useState} from "react"
import { useSelector } from 'react-redux';
import Comment from './Comment';

function Comments({id}){
    const text=useRef(null)
    const userID=useSelector((store)=>store.user.userID)
    const [comments, setComments]=useState([])

    useEffect(()=>{
        const getSong=()=>{
            fetch("http://localhost:8000/app/upload-song/"+id+"/")
            .then(resp=>resp.json())
            .then(data=>{
                setComments(data.comments)
                console.log("Inside Comments-->",data.comments)
                // dispatch(uploadMusic(data))
            })
        }
        getSong()
    },[])


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8000/app/comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text:text.current.value,
                    songID:id,
                    userID:userID
                })
            });
    
            const data = await response.json();
            console.log('Song updated successfully:', data);
            // console.log(data)
        } catch (error) {
            console.error('There was a problem with the update request:', error);
        }
    }

    return (
        <div className='absolute flex flex-col justify-between h-1/2 w-[300px] left-[490px] border-double border-4 border-indigo-600'>
            {/* <p>No Comments yet!!</p> */}
            {
                comments.map((comment)=>{
                    return <Comment text={comment} />
                })
            }
            <TextareaAutosize ref={text} placeholder="Add a comment..." />
            <button onClick={(e)=>handleSubmit(e)}>Post</button>
        </div>
    )
}

export default Comments