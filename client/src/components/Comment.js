import React from 'react';
import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 
const ClientBaseURL = "https://secret-garden-80299.herokuapp.com/stories";


function Comment(props) {
//set state of form field
  const [formData, setFormData] = useState({
    comment: "",
  });
  const navigate = useNavigate();


  //access story id from props
  const storyId = props.storyId;

  const user = props.user;
    
  //define submit
      function handleSubmit(e){
      e.preventDefault()
      const comment = formData.comment;

      //get token from ls
      const token = localStorage.getItem('token');

     //make the request
      axios.post(`${baseURL}/${storyId}/comments`,{comment},{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
         //console.log(response.data);
        navigate(`/stories/${storyId}`);
        window.location.reload();
        
      
    });
  }
   
    return (
        <div> 
          {user ?
       <form action=''onSubmit = {handleSubmit}method='POST'className='comment-form'>
      
        <input type="text"onChange = {(e) => setFormData({...formData,comment: e.target.value})}  name="comment"placeholder='What are your thoughts?'value={formData.comment}className='comment-input'/>
        <button type="submit"className='comment-submit'>Respond</button>
        </form>  : <a className='logInAsk'href='/sign-in'>Log in to be able to comment.</a> } 
        </div>
      )
}

export default Comment;