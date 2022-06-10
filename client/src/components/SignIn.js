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
  const [errorMsg,setErrorMsg] = useState('');
  const [successMsg,setSuccessMsg] = useState('');
  const navigate = useNavigate();

    
      function handleSubmit(e){
        e.preventDefault()
        const username = formData.username;
        const password = formData.password;
        
      axios.post('http://localhost:3000/api/auth/sign-in', {username,password })
      .then((result) => {
        if(!result.data.message){
        const token = result.data.token;
        saveToken(token);
        window.location.href = '/'
      } else {
        setErrorMsg(result.data.message)
      }
        });
      }
      function saveToken(token){
        localStorage.setItem('token', `${token}`);
        //const getToken = localStorage.getItem('token')
       // console.log(getToken)
      }
   
    return (
        <div id='signInSection'> 
        <div className='errorMsg'>{errorMsg}</div>
        <form className='form' action=''onSubmit = {handleSubmit}method='POST'>
        <div className='signInHeader'>Log in</div>
        <label for="username">Username</label>
        <input type="text"onChange = {(e) => setFormData({...formData,username: e.target.value})}  name="username"placeholder='Enter name'value={formData.username}/>
        <label for="password">Password</label>
        <input type="text" onChange = {(e) => setFormData({...formData, password: e.target.value})}  name="password"placeholder='Enter password'value={formData.password}/>
        <button type="submit">Submit</button>
        </form> 
        </div>
      )
}
 
export default SignIn;
