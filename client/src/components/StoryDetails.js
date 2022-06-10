import '../App.css';
import axios from 'axios';
import React from "react";
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import Comment from './Comment';
import GetComments from './GetComments';
import { useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';



const baseURL = "http://localhost:3000/api/stories"; 

function StoryDetails(props){
  const [story, setStory] = React.useState(null);
  const { storyId } = useParams();
  const [storyTitle, setStoryTitle] = React.useState("");
  const [storyDesc,setStoryDesc] = React.useState("");
  const [updateMode,setUpdateMode] = React.useState(false);
  const [comments,setComments] = React.useState("");
  const path = "http://localhost:3000/images/";
  const navigate = useNavigate();
  const userId = props.user._id;

  console.log(props.user);

  //make the request
  React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}`).then((response) => {
      setStory(response.data);
      setStoryTitle(response.data.story.title)
      setStoryDesc(response.data.story.text);
      setComments(response.data.story.comments)
    });
  }, []);

  
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const title = storyTitle;
    const text = storyDesc;
    
    
  try{
  await axios.put(`${baseURL}/${storyId}`, {title,text,comments},{ headers: {"Authorization" : `Bearer ${token}`}})
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
      <div className="story-model">
        <div className='author-profile'>
        <FaUserCircle className='model-author-icon'/>
        <div className='model-author-date'>
             <span>
                 {story.story.author.username}
            </span>
            <span className='model-date'>
                 {new Date(story.story.dated).toDateString()}
            </span>
            </div>
            </div>  
 <div className='editDeleteCell'>
{userId===story.story.author._id ? 
   <button onClick={handleOnClick}>Edit story</button> : '' }
 
 {userId===story.story.author._id? 
    <button onClick={handleDeleteClick}>Delete</button> : ''}
</div>


  {updateMode ? <input type='text'value={storyTitle}onChange={(e)=>setStoryTitle(e.target.value)}/> :
    <h2 className='model-story-title'>{story.story.title}</h2>
  }
     <img src="https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=600&q=60"alt=""className='model-blog-img'></img>

{story.story.photo ? <img src={path + story.story.photo}alt=""/>  : ''}
   {updateMode ? <textarea value={storyDesc}onChange={(e)=>setStoryDesc(e.target.value)}/> :
    <p className='modelStoryDesc'>{story.story.text}</p>
  }

  {updateMode ? <button onClick={handleUpdate}>Update</button> : '' }
    
    <div className='comment-section'>
    <h2 className='comments-header'>Responses</h2>
  
    <Comment storyId={story.story._id}/>
    <GetComments storyId={story.story._id}></GetComments>
    </div>
    </div>
    </div>
  );
}


export default StoryDetails;
