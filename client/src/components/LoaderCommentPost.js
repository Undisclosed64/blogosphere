import React from 'react';
import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from  'react-loader-spinner'



function LoaderCommentPost() {
    return (
        <div>  
        <h1 className='loadingComment'>Posting comment..</h1>
        <div className='loaderComment'>
         <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
        </div>
    );
}

export default LoaderCommentPost;