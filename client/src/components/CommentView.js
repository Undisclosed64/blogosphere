import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai';
import CommentDeleted from './CommentDeleted';


const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 


function CommentView(props) {
   const navigate = useNavigate();
   const userName = props.user.username;
   const { storyId,commentId } = useParams();
   const [comment, setComment] = React.useState(null);
   const [updateMode,setUpdateMode] = React.useState(false);
  const [commentBody,setCommentBody] = React.useState("");
  const [commentErr,setCommentErr] = React.useState(false);
  const token = localStorage.getItem('token');


const handleUpdate = async () => {
    const comment = commentBody;
   // console.log(comment)
  try{
  await axios.put(`${baseURL}/${storyId}/comments/${commentId}`, {comment},{ headers: {"Authorization" : `Bearer ${token}`}})
  .then((result) => {
   // console.log(result.data);
  });
  navigate(`/stories/${storyId}`);
  

} catch(err) {
   console.log(err)
  }
}
//make the request
React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}/comments/${commentId}`).then((response) => {
     // console.log(response.data);
      setComment(response.data);
      setCommentBody(response.data.comment.comment)
    }).catch(() => {
     setCommentErr(true)
    })
  },
  []);

  const handleDelete = async() => {
    navigate(`/stories/${storyId}/comments/${commentId}/delete`)
} 

  if(commentErr) return <CommentDeleted/>
  if(!comment) return <Loader/>
  
    return (
      <div className='commentView'>
        <div>{commentErr}</div>
        <div className='comment-model'>
    <div className='editDelGroup'>
    {userName === comment.comment.username ? 
        <span onClick={() => setUpdateMode(true)}className="commentBtn"id='edBtn'>
          <FiEdit/>
          </span>
    : '' }
    {userName === comment.comment.username ? 
        <span onClick={handleDelete}className="commentBtn"id='delBtn'><AiOutlineDelete/></span>
    : '' }
</div>
        {updateMode ? 
        <input type='text'className="commentEditInput"value={commentBody} onChange={(e)=> setCommentBody(e.target.value)}/> :
        <p className='commentModelText'>{comment.comment.comment}</p>
      }
      {updateMode ? <button className='updateBtn'onClick={handleUpdate}>Update</button> : ''}

        </div>
        </div>
    )

}

export default CommentView;