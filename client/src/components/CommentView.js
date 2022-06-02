import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';




const baseURL = "http://localhost:3000/api/stories"; 

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
      console.log(response.data);
      setComment(response.data);
      setCommentBody(response.data.comment.comment)
    });
  }, []);

  const handleDelete = async() => {
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
        <div className='comment-model'>

{userName === comment.comment.username ? 
        <button onClick={() => setUpdateMode(true)}>Edit</button>
    : '' }
    {userName === comment.comment.username ? 
        <button onClick={handleDelete}>Delete</button>
    : '' }

        {updateMode ? 
        <input type='text'value={commentBody} onChange={(e)=> setCommentBody(e.target.value)}/> :
        <h2>{comment.comment.comment}</h2>
      }
      {updateMode ? <button onClick={handleUpdate}>Update</button> : ''}

        </div>
    )

}

export default CommentView;