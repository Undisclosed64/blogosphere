import React from 'react';
import '../App.css';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 

function DeleteStory() {
    const navigate = useNavigate();
    const { storyId,commentId } = useParams();
    const token = localStorage.getItem('token');

const cancelDelete = () => {
    navigate(`/stories/${storyId}/comments/${commentId}`)

}
    const deleteComment = async() => {
        try{
            await axios.delete(`${baseURL}/${storyId}/comments/${commentId}`,{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
                  //console.log(response.data)
                  navigate(`/stories/${storyId}`)

                });
              } catch(err) {
                //console.log(err)
              } 
}
    return (
        <div className='deleteCommentContainer'>
           <h1>Delete Comment</h1>
           <div>Are you sure you want to delete this comment?</div>
           
           <div className='deleteCommentBtns'>
           <button onClick={cancelDelete}className='btn-cancel'>Cancel</button>
            <button onClick={deleteComment}className='btn-confirm'>Delete</button>
            </div> 
            </div>      
        
    )
}

export default DeleteStory;