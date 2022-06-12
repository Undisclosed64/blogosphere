import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 

function DeleteStory() {
    const navigate = useNavigate();
    const [message,setMessage] = React.useState('')
    const { storyId } = useParams();
    const token = localStorage.getItem('token');

const cancelDelete = () => {
    navigate(`/stories/${storyId}`)

}
    const deleteStory = async() => {
        try{
        await axios.delete(`${baseURL}/${storyId}`,{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
            //console.log(response.data)
            setMessage(response.data.message);
            window.location.href='/';
          });
 
} catch(err){
//console.log(err)
setMessage(err)
}
}
    return (
        <div className='deleteStoryContainer'>
           <h1>Delete Story</h1>
           <div>Are you sure you want to delete this story?</div>
            <button onClick={cancelDelete}>Cancel</button>
            <button onClick={deleteStory}>Delete</button>
            </div>       
        
    )
}

export default DeleteStory;