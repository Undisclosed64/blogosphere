import React from 'react';
import '../App.css';
import StoryDetails from './StoryDetails'


function Home(props) {
    console.log(props.posts)
    return (
        <div>
            <h1>Welcome to the blog home page!</h1>
            {props.posts.map(home => 
            <div key={home._id}>
             <div className='post-cell'>
            <h2>{home.title}</h2>
            <h4>{home.author.username}</h4>
            <p>{home.dated}</p> 
            </div>       
            </div>
            )}
        </div>
    );
}

export default Home;