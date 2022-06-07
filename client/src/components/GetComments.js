import React from 'react';
import '../App.css';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";



const baseURL = "http://localhost:3000/api/stories"; 

function GetComments(props) {
    const navigate = useNavigate();
    const [comments, setComments] = React.useState(null)
    //access story id from props
    const storyId = props.storyId;

     //make the request
     React.useEffect(() => {
      axios.get(`${baseURL}/${storyId}/comments`).then((response) => {
      setComments(response.data);
    });
}, []);

const commentModel = (id) => {
  navigate(`/stories/${storyId}/comments/${id}`)
}
if(!comments) return <Loader/>

    return (
        <div> 
       <div className='commentContainer'>
         {comments.comments.map(comment => 
          <div key={comment._id} className='comment-wrapper'onClick={()=>commentModel(comment._id)}>
          <div>{comment.comment}</div> 
          <span>{comment.username}</span>
          <span>{new Date(comment.timeStamp).toDateString()}</span>
          </div>
         )}
        </div>
        </div>
      )
}

export default GetComments;
