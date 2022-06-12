import React  from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';



function CreateStory() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

    
      const handleSubmit = async(e) => {
        e.preventDefault();
        const newPost = {
         title:formData.title,
         text:formData.text
        }
        const token = localStorage.getItem('token');
       
        if(file){
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name",filename);
          data.append("file",file);
          newPost.photo = filename;

          try{
            await axios.post("https://secret-garden-80299.herokuapp.com/api/upload",data)
          } catch(err){
           
          }
        }
      try{
      const res = await axios.post('https://secret-garden-80299.herokuapp.com/api/stories', newPost, { headers: {"Authorization" : `Bearer ${token}`}})
       const id = res.data.newStory._id;
       navigate(`/stories/${id}`)
      // console.log(res.data);
    } catch(err){

    }
  }
   
    return (
        <div> 
        <h1>Create a story</h1>
      
        {file && (
          <img src={URL.createObjectURL(file)}alt=""/>
        )}
        <form action=''onSubmit = {handleSubmit}method='POST'>
        <div className="writeFormGroup">
          <label htmlFor="fileInput"></label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <input type="text"onChange={(e) => setFormData({...formData,title: e.target.value})}name="title"placeholder='Title'/>
        <input type="text"onChange={(e) => setFormData({...formData,text: e.target.value})}name="text"placeholder='Tell your story..'/>
        <button type="submit">Publish</button>
        </form>     
        </div>
      )
}

export default CreateStory;
