import React from 'react';
import '../App.css';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa';



const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 

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
            <div className='comment-info'>
              <span id="commentAuthorIcon">
            <FaUserCircle/>
            </span>
            <div className='commentUserDate'>
          <span className='comment-author'>{comment.username} </span>
          <span className='comment-time'>{new Date(comment.timeStamp).toDateString()}</span>
          </div>
          </div>

          <div className='comment-text'>{comment.comment}</div> 
          </div>
         )}
        </div>
        </div>
      )
}

export default GetComments;
