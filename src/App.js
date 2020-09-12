import React from "react";
import "./App.css";
import Post from "./components/Post";

function App() {
  return (
    <div className="App">
      {/* header */}
      <div className="app__header">
        <img
          src="https:instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="gdkls"
          className="app__header__img"
        />
      </div>

      {/* post */}
      <Post
        user_name="Adil Zamal"
        image_url="https://freecodecamp.org/news/content/images/size/w600/2020/09/corinne-kutz-tMI2_-r5Nfo-unsplash.jpg"
        text="how is everybody doing"
      />
      <Post
        user_name="Nikhil Kumar"
        image_url="https://freecodecamp.org/news/content/images/size/w600/2020/09/corinne-kutz-tMI2_-r5Nfo-unsplash.jpg"
        text="I am Competitive programming god"
      />
      <Post
        user_name="Rishav Kumar"
        image_url="https://freecodecamp.org/news/content/images/size/w600/2020/09/corinne-kutz-tMI2_-r5Nfo-unsplash.jpg"
        text="I am development god"
      />
      <Post
        user_name="Ashutosh Biswal"
        image_url="https://freecodecamp.org/news/content/images/size/w600/2020/09/corinne-kutz-tMI2_-r5Nfo-unsplash.jpg"
        text="I am snake"
      />
    </div>
  );
}

export default App;
