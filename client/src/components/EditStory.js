/*import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';


const baseURL = "http://localhost:3000/api/stories";

export default function EditStory() {
  const [story,setStory] = React.useState(null);
  const { storyId } = useParams();


    React.useEffect(() => {
    axios.get(`${baseURL}/${storyId}`).then((response) => {
      console.log(response.data);
     setStory(response.data);
    });
  }, []);
  
  function handleSubmit(e){
   alert('submit')
  }
  

  if(!story) return <Loader/>
  return (
    <div>
      <h1>Edit your story</h1>
      <h2>{story.story.title}</h2>
       <form action=''onSubmit = {handleSubmit}method='POST'>
         <div></div>
        <input type="text"  name="title"placeholder='Title'value={story.story.title}/>
        <input type="text"  name="text"placeholder='Text'value={story.story.text} />
        <button type="submit">Submit</button>
        </form>   
    </div>
  )
}*/