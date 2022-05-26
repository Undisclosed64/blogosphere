import React, { Component } from 'react'
import {
    BrowserRouter,
    Link,
  } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
        <div>
        <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/sign-up">Sign up</Link>
           </li>
           <li>
             <Link to="/sign-in">Sign in</Link>
           </li>
           <li>
             <Link to="/stories/create">Create story</Link>
           </li>
         </ul>
      </div>

    )
  }
}


