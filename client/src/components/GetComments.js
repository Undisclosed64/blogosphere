import React from 'react';
import '../App.css';
import axios from 'axios';
import Loader from './Loader';


const baseURL = "http://localhost:3000/api/stories"; 

function GetComments(props) {
    const [comments, setComments] = React.useState(null)
    //access story id from props
    const storyId = props.storyId;

     //make the request
     React.useEffect(() => {
      axios.get(`${baseURL}/${storyId}/comments`).then((response) => {
      console.log(comments)
      setComments(response.data);
    });
}, []);

if(!comments) return <Loader/>

    return (
        <div> 
       <div className='commentContainer'>
         {comments.comments.map(comment => 
          <div key={comment._id} className='comment-wrapper'>
          <div>{comment.comment}</div>
          <span>{comment.username}</span>
          <span>{comment.timeStamp}</span>
          </div>
         )}
        </div>
        </div>
      )
}

export default GetComments;
