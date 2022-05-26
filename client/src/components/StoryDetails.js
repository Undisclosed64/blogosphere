import '../App.css';
import axios from 'axios';
import React from "react";
import { useParams } from 'react-router-dom'
import Loader from './Loader';
import Comment from './Comment';

const baseURL = "http://localhost:3000/api/stories"; 

function StoryDetails(){
  const [story, setStory] = React.useState(null);
  const { storyId } = useParams();

  //make the request
  React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}`).then((response) => {
      setStory(response.data);
    });
  }, []);

  function takeToHomePage(){
    window.location.href='/'
  }
  if(!story) return <Loader/>
  console.log(story.story.comments);

  const comments = story.story.comments;
  
  return (
    <div className='story-model-container'>
    <div onClick={takeToHomePage}>Back</div>
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

    <Comment storyId={story.story._id}/>
    <h2>Comments</h2>
    <hr></hr>
    <div className='commentContainer'>
    {comments.map(comment =>
      <div key={comment._id} className='comment-wrapper'>
      <div>{comment.comment}</div>
      <span>{comment.username}</span>
      <span>{comment.timeStamp}</span>
      </div>
      )}
            </div>
    </div>
    </div>
  );
}


export default StoryDetails;
