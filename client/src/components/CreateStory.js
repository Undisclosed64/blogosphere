import React  from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';


function CreateStory(props) {
  const [formData, setFormData] = useState({
    title: "",
    text: ""
  });
  const navigate = useNavigate();

    
      function handleSubmit(e){
        e.preventDefault()
        const title = formData.title;
        const text = formData.text;

    const token = localStorage.getItem('token');

      axios.post('http://localhost:3000/api/stories', {title,text}, { headers: {"Authorization" : `Bearer ${token}`}})
      .then((result) => {
        console.log(result.data)
       if(result.data.newStory!==undefined){
       const id = result.data.newStory._id;
       navigate(`/stories/${id}`)
       }
      });
      }
   
    return (
        <div> 
        <h1>Create a story</h1>
        <form action=''onSubmit = {handleSubmit}method='POST'>
        <input type="text"onChange = {(e) => setFormData({...formData,title: e.target.value})}  name="title"placeholder='Title'value={formData.title}/>
        <input type="text" onChange = {(e) => setFormData({...formData, text: e.target.value})}  name="text"placeholder='Text'value={formData.text}/>
        <button type="submit">Submit</button>
        </form>     
        </div>
      )
}

export default CreateStory;
