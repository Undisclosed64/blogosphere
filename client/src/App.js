import './App.css';
import axios from 'axios';
import React, { useState } from "react";
import Home from './components/Home';
import StoryDetails from './components/StoryDetails'
import Loader from './components/Loader';
import SignUp from './components/SignUp';


import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Switch
} from 'react-router-dom';


//const baseURL = "http://localhost:3000/stories";  

function App(){
    const [posts,setPost] = useState(null)
  React.useEffect(()=> {
    axios.get("http://localhost:3000/stories").then((res)=> {
      setPost(res.data)
    })
  },[]);
  //console.log(post)
  return (
    <div className="App">
    <BrowserRouter>
   <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sign-up">Sign up</Link>
      </li>
      <li>
        <Link to="/log-in">Sign in</Link>
      </li>
    </ul>
<Routes>
<Route exact path='/'element={posts===null ? <Loader/> : <Home posts={posts}></Home>}/>  
<Route exact path='/sign-up'element={<SignUp></SignUp>}/>    

 </Routes>
 </BrowserRouter>
 </div>

 
  );
}


export default App;
