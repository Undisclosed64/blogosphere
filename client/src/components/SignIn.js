import React from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';


function SignIn(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

    
      function handleSubmit(e){
        e.preventDefault()
        const username = formData.username;
        const password = formData.password;
        
      axios.post('http://localhost:3000/api/auth/sign-in', {username,password })
      .then((result) => {
        console.log(result.data);

        const token = result.data.token;
        if(token !== undefined){
        saveToken(token)
        }
      
        navigate('/')
      });
      }
      function saveToken(token){
        localStorage.setItem('token', `${token}`);
        const getToken = localStorage.getItem('token')
        console.log(getToken)
      }
   
    return (
        <div> 
        <h1>Sign in</h1>
        <p>This is the last step,don't be lazy:(</p>
        <form action=''onSubmit = {handleSubmit}method='POST'>
        <input type="text"onChange = {(e) => setFormData({...formData,username: e.target.value})}  name="username"placeholder='Enter name'value={formData.username}/>
        <input type="text" onChange = {(e) => setFormData({...formData, password: e.target.value})}  name="password"placeholder='Enter password'value={formData.password}/>
        <button type="submit">Submit</button>
        </form> 
        </div>
      )
}
 
export default SignIn;
