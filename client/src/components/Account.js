import React from 'react';
import '../App.css';
import {ImUser} from 'react-icons/im'


function Account(props) {
   const userName = props.user.username;

    return (
        <section className='accountSection'>
      <div className='accountView'>
        <div className='user-control'>
        <span className='user'>
        <ImUser/>
        </span>
       <div className='username'>{userName}</div>
       </div>
       <p id='accountDesc'>More functionalities coming soon!</p>
        </div>
        </section>
    )

}

export default Account;