import React from 'react';
import '../App.css';
import Loader from './Loader';

function LogOut() {
   localStorage.removeItem('token');
   setTimeout(
    () => window.location.href='/', 
    3000
  );

    return (
        <div>
     <div className='logOut'>Logging out..</div>
      <Loader></Loader>
      </div>
    )

}

export default LogOut;