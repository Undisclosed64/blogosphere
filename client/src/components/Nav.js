import React from 'react';
import '../App.css';
import {
    Link,
  } from 'react-router-dom';


function Nav(){
const user = localStorage.getItem('token');

function makeNavResponsive(){
const navbarLinks = document.querySelector('.rhs-links');
navbarLinks.classList.toggle('active');
}

function closeNav(){
  const navbarLinks = document.querySelector('.rhs-links');
  navbarLinks.classList.toggle('active');
}
    return (
      <header>
      <nav className='nav'>
         <Link to="/"className='navLinkLeft'>Home</Link>

         <div>
        <a href="#"className='toggle-button'onClick={makeNavResponsive}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
        </div>
        {!user ? 
         <div className='rhs-links'onClick={closeNav}>
         <Link to="/sign-in"className='navLinkRight'id="logInLink">Log in</Link>
         <Link to="/sign-up"className='navLinkRight'id="createAccountLink">Create account</Link> 
         </div> 
         : 
         <div className='rhs-links'onClick={closeNav}>
         <Link to="/account"className='navLinkRight'>Account</Link>
         <Link to="/log-out"className='navLinkRight'id="logOutLink">Log out</Link> 
         </div> 
}
         
        

     </nav>
  </header>

    )
}


export default Nav;