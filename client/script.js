
const blogsContainer = document.querySelector('.blogsContainer');
const blogPreview = document.querySelector('.blogPreview');
const blogIndividual =  document.querySelector('.individual-blog');

//fetch blogs
async function fetchBlogs(){
 fetch('http://localhost:3000/api/stories')
    .then((response) => response.json())
    .then((responseJSON) => {
        const stories = responseJSON.stories;
        for(let i = 0;i<stories.length;i++){
           console.log(stories[i])
           const li = document.createElement('li');
           li.append(stories[i].title)
           blogPreview.appendChild(li)
           blogsContainer.append(blogPreview)
        }
    });
}
fetchBlogs()
