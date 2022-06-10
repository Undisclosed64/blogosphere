import React from 'react';
import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from  'react-loader-spinner'



function Loader() {
    return (
        <div className='loader'>
<ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
    );
}

export default Loader;