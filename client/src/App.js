import './App.css';
import axios from 'axios';
import React from "react";
import Home from './components/Home';
import SignUp from './components/SignUp'
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import CreateStory from './components/CreateStory'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import StoryDetails from './components/StoryDetails';

const baseURL = "http://localhost:3000/api";


function App(){
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/stories`).then((response) => {
      console.log(response.data)
      setPost(response.data);
    });
  }, []);

  if(!post) return <Loader/>;

  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
<Routes>
<Route exact path='/'element={<Home name='Tahera'post={post}></Home>}/>  
<Route exact path='/stories/:storyId'element={<StoryDetails></StoryDetails>}/> 
<Route exact path='/stories/create'element={<CreateStory></CreateStory>}/> 
<Route exact path='/sign-up'element={<SignUp></SignUp>}/>
<Route exact path='/sign-in'element={<SignIn></SignIn>}/>    
  

 </Routes>
 </BrowserRouter>
 </div>
  );
}


export default App;
