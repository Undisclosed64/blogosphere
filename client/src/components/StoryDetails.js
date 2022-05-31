import '../App.css';
import axios from 'axios';
import React from "react";
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import Comment from './Comment';
import GetComments from './GetComments';
import { useNavigate } from "react-router-dom"


const baseURL = "http://localhost:3000/api/stories"; 

function StoryDetails(){
  const [story, setStory] = React.useState(null);
  const { storyId } = useParams();
  const navigate = useNavigate();

  //make the request
  React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}`).then((response) => {
      setStory(response.data);
    });
  }, []);

  function takeToHomePage(){
    window.location.href='/'
  }
  /*function navigateToEdit(){
    navigate(`/stories/${storyId}/edit`)
  }*/
  function handleEditing(){
    navigate(`/stories/${storyId}/edit`)
  }
  if(!story) return <Loader/>
  //console.log(story.story.comments);

  //const comments = story.story.comments;
  
  return (
    <div className='story-model-container'>
    <div onClick={takeToHomePage}>Back</div>
    <button onClick={handleEditing}>Edit story</button>
    <div className="story-model">
        <div className='author-profile'>
             <span>
                 {story.story.author.username}
            </span>
            <span>
                 {story.story.dated}
            </span>
            </div>   
            <h2>{story.story.title}</h2>
            <p>{story.story.text}</p>

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
