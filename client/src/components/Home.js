import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Home(props) {
  const stories = props.post.stories;
  const navigate = useNavigate();
  const path = "https://real-tick-suit.cyclic.app/images/";

  //define funtion to navigate to story model route
  const storyModelNavigate = (id) => {
    navigate(`/stories/${id}`);
  };
  return (
    <section className="section-home">
      <div className="homePage">
        <h1 id="blog-name">
          Blogosphere<span>.</span>
        </h1>
        <p className="blog-intro">
          Welcome to Blogosphere! This platform is for the aspiring developers
          to learn their favorite technical concepts. We want this to be the one
          stop destination for writers and readers who are curious about
          technology. In the coming time, you will be able to learn web
          development and technical writing through this single platform. Until
          then, thanks for sticking!{" "}
        </p>
      </div>

      <div className="section-story">
        <div className="story-container">
          {stories.map((story) => (
            <div
              key={story._id}
              className="story-wrapper"
              onClick={() => storyModelNavigate(story._id)}
            >
              <img
                src={`${path}/${story.photo}`}
                alt=""
                className="blogImg"
              ></img>
              <div className="story-info">
                <h2 className="story-title">{story.title}</h2>
                <p className="story-desc">{story.text}</p>
                <div className="publish-info">
                  <div className="author-profile">
                    <FaUserCircle className="author-icon" />
                    <span>{story.author.username}</span>
                  </div>

                  <span className="seperator">|</span>
                  <div className="written-date">
                    {new Date(story.dated).toDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
