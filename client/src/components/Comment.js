import React from 'react';
import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoaderCommentPost from './LoaderCommentPost';



const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 

const id = '62a632fb617c6e9c07d3c546';
function Comment(props) {
//set state of form field
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [loaderDisplay,setLoaderDisplay] = useState(false);
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
        setLoaderDisplay(true)
        setTimeout(
          () => window.location.reload(),
          500
        );
    
   });
  }
   
    return (
        <div> 
          {loaderDisplay? <LoaderCommentPost/> : '' } 
          {user ?
       <form action=''onSubmit = {handleSubmit}method='POST'className='comment-form'>
        <input type="text"onChange = {(e) => setFormData({...formData,comment: e.target.value})}  name="comment"placeholder='What are your thoughts?'value={formData.comment}className='comment-input'/>
        <button type="submit"className='comment-submit'>Respond</button>
        </form>  : <a className='logInAsk'href='/sign-in'>Log in to be able to comment.</a> } 
        </div>
      )
}

export default Comment;