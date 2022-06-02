import '../App.css';
import axios from 'axios';
import React from "react";
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import Comment from './Comment';
import GetComments from './GetComments';
import { useNavigate } from "react-router-dom";


const baseURL = "http://localhost:3000/api/stories"; 

function StoryDetails(props){
  const path = "http://localhost:3000/images/";
  const [story, setStory] = React.useState(null);
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [storyTitle, setStoryTitle] = React.useState("");
  const [storyDesc,setStoryDesc] = React.useState("");
  const [updateMode,setUpdateMode] = React.useState(false);
  const [comments,setComments] = React.useState("");


  const userId = props.user._id;
  console.log(props.user)
  //make the request
  React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}`).then((response) => {
      setStory(response.data);
      setStoryTitle(response.data.story.title)
      setStoryDesc(response.data.story.text)
    });
  }, []);

  //fetch comments
  React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}/comments`).then((response) => {
      setComments(response.data.comments)
    });
  }, []);


  function takeToHomePage(){
    window.location.href='/'
  }

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const title = storyTitle;
    const text = storyDesc;
    
  try{
  await axios.put(`${baseURL}/${storyId}`, {title,text,comments},{ headers: {"Authorization" : `Bearer ${token}`}})
  .then((result) => {
    console.log(result.data);
  });
  window.location.href=`/stories/${storyId}`
  } catch(err) {
   console.log(err)
  }
}
const handleOnClick = () => {
setUpdateMode(true);
navigate(`/stories/${storyId}/update`)
}

const handleDeleteClick = () => {
 navigate(`/stories/${storyId}/delete`)
}
  if(!story) return <Loader/>
  
  return (
    <div className='story-model-container'>


    <div onClick={takeToHomePage}>Back</div>

{userId===story.story.author._id ? 
   <button onClick={handleOnClick}>Edit story</button> : '' }
 
 {userId===story.story.author._id? 
    <button onClick={handleDeleteClick}>Delete</button> : ''}


    <div className="story-model">
        <div className='author-profile'>
             <span>
                 {story.story.author.username}
            </span>
            <span>
                 {story.story.dated}
            </span>
            </div>  


      {updateMode ? <input type='text'value={storyTitle}onChange={(e)=>setStoryTitle(e.target.value)}/> :
    <h2>{story.story.title}</h2>
  }
{story.story.photo ? <img src={path + story.story.photo}alt=""/>  : ''}
   {updateMode ? <textarea value={storyDesc}onChange={(e)=>setStoryDesc(e.target.value)}/> :
    <p>{story.story.text}</p>
  }
  {updateMode ? <button onClick={handleUpdate}>Update</button> : '' }
    <hr></hr>
    <h2>Comments</h2>
    <hr></hr>
    <Comment storyId={story.story._id}/>
    <GetComments storyId={story.story._id}></GetComments>
    </div>
    </div>
  );
}


export default StoryDetails;
