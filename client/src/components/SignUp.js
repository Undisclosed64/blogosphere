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
  const [errorMsg,setErrorMsg] = useState('');

  const navigate = useNavigate();

    
      function handleSubmit(e){
        e.preventDefault()
        const username = formData.username;
        const password = formData.password;
        if(username === '' || password === ''){
          setErrorMsg('Field can not be empty!')
         } else {
      axios.post('https://secret-garden-80299.herokuapp.com/api/auth/sign-up', {username,password })
      .then((result) => {
        //console.log(result.data)
        navigate('/sign-in')
      });
      }
    }
   
    return (
        <div id='signUpSection'>
          <div className='errorMsg'>{errorMsg}</div> 
        <form className='form' action=''onSubmit = {handleSubmit}method='POST'>
        <div className='signUpHeader'>Create account</div>
        <label htmlFor="username">Username</label>
        <input type="text"onChange = {(e) => setFormData({...formData,username: e.target.value})}  name="username"placeholder='Your name'value={formData.username}/>
        <label htmlFor="password">Password</label>
        <input type="password" onChange = {(e) => setFormData({...formData, password: e.target.value})}  name="password"placeholder='Create password'value={formData.password}/>
        <button type="submit">Submit</button>
        </form>     
        </div>
      )
}

export default SignUp;
