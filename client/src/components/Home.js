import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';

function Home(props) {
    const stories = props.post.stories;
    const navigate = useNavigate();
    const path = "https://secret-garden-80299.herokuapp.com/images/";
    
   //define funtion to navigate to story model route
    function storyModelNavigate(id){
       navigate(`/stories/${id}`)
    }
    return (
        <section className='section-home'>
            <div className='homePage'>
            <h1 id='blog-name'>Techno Diary</h1>
            <p className='blog-intro'>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
            </div>

<div className='section-story'>
        <div className='story-container'>
            {stories.map(story => 
            <div key={story._id}className="story-wrapper"onClick={()=>storyModelNavigate(story._id)}>
                
            <img src={`${path}/${story.photo}`}alt=""className='blogImg'></img>
            <div className='story-info'>
            
            <h2 className='story-title'>{story.title}</h2>
            <p className='story-desc'>{story.text}</p>
            <div className='publish-info'>

            <div className='author-profile'>
             <FaUserCircle className='author-icon'/>
            <span>{story.author.username}</span>
            </div>

            <span className='seperator'>|</span>
            <div className='written-date'>{new Date(story.dated).toDateString()}</div> 
            </div> 
             </div>
             </div>
            )}
        </div>
        </div>
        </section>
    );
}

export default Home;