import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'




const baseURL = "https://secret-garden-80299.herokuapp.com/api/stories"; 

function CommentView(props) {
   const navigate = useNavigate();
   const userName = props.user.username;
   const { storyId,commentId } = useParams();
   const [comment, setComment] = React.useState(null);
   const [updateMode,setUpdateMode] = React.useState(false);
  const [commentBody,setCommentBody] = React.useState("");
  const [message,setMessage] = React.useState('')
  const token = localStorage.getItem('token');


const handleUpdate = async () => {
    const comment = commentBody;
  try{
  await axios.put(`${baseURL}/${storyId}/comments/${commentId}`, {comment},{ headers: {"Authorization" : `Bearer ${token}`}})
  .then((result) => {
    console.log(result.data);
  });
  navigate(`/stories/${storyId}`)
} catch(err) {
   console.log(err)
  }
}
//make the request
React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}/comments/${commentId}`).then((response) => {
      //console.log(response.data);
      setComment(response.data);
      setCommentBody(response.data.comment.comment)
    });
  }, []);

  const handleDelete = async() => {
   const ask = prompt("Are you sure you want to delete?");
   if(ask==='yes' || ask === 'yeah' || ask === 'yea' )

  try{
  await axios.delete(`${baseURL}/${storyId}/comments/${commentId}`,{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
        console.log(response.data)
       setMessage(response.data.message);
      });
      window.location.href = `/stories/${storyId}`;

    } catch(err) {
      console.log(err)
      setMessage(err)
    } 
   
} 

  if(!comment) return <Loader/>
    return (
      <div className='commentView'>
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