import React from 'react';
import '../App.css';


function SignUp() {
    return (
        <div>
            <h1>Sign up</h1>
            <form action='/'method='POST'>
    <input type="text" name="name"placeholder='Your name' />
    <input type="text" name="password"placeholder='Create password'/>
    <input type="submit" value="Submit" />
</form>
          
        </div>
    );
}

export default SignUp;