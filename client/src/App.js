import './App.css';
import axios from 'axios';
import React, { useState } from "react";
import Home from './components/Home';
import { Component } from 'react';

//const baseURL = "http://localhost:3000/stories";  

function App(){
    const [post,setPost] = useState(null)
  React.useEffect(()=> {
    axios.get("http://localhost:3000/stories").then((res)=> {
      setPost(res.data)
    })
  },[]);
  return (
    <div className="App">
     <Home post={post}/>
    </div>
  );
}


export default App;
