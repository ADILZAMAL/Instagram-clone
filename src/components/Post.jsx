import { Avatar } from "@material-ui/core";
import React from "react";
import "../styles/Post.css";
function Post({ user_name, image_url, text }) {
  return (
    <div className="post">
      {/* header-> avatar + username +hamburger */}
      <div className="post__header">
        <Avatar
          className="post__header__avatar"
          alt={user_name}
          src="/static/images/avatar/1.jpg"
        />
        <h3 className="post__header__username">{user_name}</h3>
      </div>

      {/* img */}
      <img className="post__image" src={image_url} alt="" />
      {/**like + comment + share + save */}
      {/** username + caption */}
      <h4 className="post__text">
        <strong>{user_name}:</strong> {text}
      </h4>
    </div>
  );
}

export default Post;
