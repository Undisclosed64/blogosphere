import '../App.css';
import axios from 'axios';
import React from "react";
import { useParams } from 'react-router-dom'
import Loader from './Loader';

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

  if(!story) return <Loader/>
  console.log(story)
  
  return (
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
    
    </div>
  );
}


export default StoryDetails;
