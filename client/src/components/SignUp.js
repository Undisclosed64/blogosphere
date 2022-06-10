import React from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';


function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

    
      function handleSubmit(e){
        e.preventDefault()
        const username = formData.username;
        const password = formData.password;
        
      axios.post('http://localhost:3000/api/auth/sign-up', {username,password })
      .then((result) => {
        navigate('/sign-in')
      });
      }
   
    return (
        <div id='signUpSection'> 
        <form className='form' action=''onSubmit = {handleSubmit}method='POST'>
        <div className='signUpHeader'>Create account</div>
        <label for="username">Username</label>
        <input type="text"onChange = {(e) => setFormData({...formData,username: e.target.value})}  name="username"placeholder='Your name'value={formData.username}/>
        <label for="password">Password</label>
        <input type="text" onChange = {(e) => setFormData({...formData, password: e.target.value})}  name="password"placeholder='Create password'value={formData.password}/>
        <button type="submit">Submit</button>
        </form>     
        </div>
      )
}

export default SignUp;
