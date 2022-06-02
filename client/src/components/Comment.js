import React from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';

const baseURL = "http://localhost:3000/api/stories"; 

function Comment(props) {
//set state of form field
  const [formData, setFormData] = useState({
    comment: "",
  });

  //call navigate
  const navigate = useNavigate();
  //access story id from props
  const storyId = props.storyId;
    
  //define submit
      function handleSubmit(e){
      e.preventDefault()
      const comment = formData.comment;

      //get token from ls
      const token = localStorage.getItem('token');

     //make the request
      axios.post(`${baseURL}/${storyId}/comments`,{comment},{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
         console.log(response.data);
         window.location.href= `/stories/${storyId}`
    });
  }
   
    return (
        <div> 
       <form action=''onSubmit = {handleSubmit}method='POST'>
        <input type="text"onChange = {(e) => setFormData({...formData,comment: e.target.value})}  name="comment"placeholder='Write a comment'value={formData.comment}/>
        <button type="submit">Submit</button>
        </form>     
        </div>
      )
}

export default Comment;