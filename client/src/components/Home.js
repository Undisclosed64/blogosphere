import React from 'react';
import '../App.css';
import StoryDetails from './StoryDetails'
import { useNavigate } from "react-router-dom"


function Home(props) {
    const stories = props.post.stories;

   const navigate = useNavigate();

   //define funtion to navigate to story model route
    function storyModelNavigate(id){
       navigate(`/stories/${id}`)
    }
    return (
        <div className='story-container'>
            {stories.map(story => 
            <div key={story._id}className="story-wrapper"onClick={()=>storyModelNavigate(story._id)}>
            <div className='author-profile'>
             <span>
                 {story.author.username}
            </span>
            <span>
                 {story.dated}
            </span>
            </div>   
            <h2>{story.title}</h2>
            <p>{story.text}</p>

            </div>       
            )}
        </div>
    );
}

export default Home;