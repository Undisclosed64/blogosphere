import React from 'react';

function Home(props) {
    console.log(props.post)
    return (
        <div>
            <h1>Welcome to the blog!</h1>
            <p>{props.post[0]}</p>
           
        </div>
    );
}

export default Home;