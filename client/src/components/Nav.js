import React, { Component } from 'react';
import '../App.css';
import {
    Link,
  } from 'react-router-dom';


export default class Nav extends Component {

makeNavResponsive = () => {
const navbarLinks = document.querySelector('.rhs-links');
navbarLinks.classList.toggle('active');
}

closeNav = () => {
  const navbarLinks = document.querySelector('.rhs-links');
  navbarLinks.classList.toggle('active');
}
  render() {
    return (
      <header>
      <nav className='nav'>
         <Link to="/"className='navLinkLeft'>Home</Link>
         <div>
        <a href="#"className='toggle-button'onClick={this.makeNavResponsive}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
        </div>
         <div className='rhs-links'onClick={this.closeNav}>
         <Link to="/sign-in"className='navLinkRight'>Log in</Link>
         <Link to="/sign-up"className='navLinkRight'>Create account</Link>
         </div>
     </nav>
  </header>

    )
  }
}


