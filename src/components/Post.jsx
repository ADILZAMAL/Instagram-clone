import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "../styles/Post.css";
import { db } from "../firebase";

function Post(props) {
  const { user_name, image_url, caption } = props.post;
  const postId = props.postId;
  const user = props.user;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      user_name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__header__avatar"
          alt={user_name}
          src="/static/images/avatar/1.jpg"
        />
        <h3 className="post__header__username">{user_name}</h3>
      </div>
      <img className="post__image" src={image_url} alt="" />
      <h4 className="post__text">
        <strong>{user_name}:</strong> {caption}
      </h4>
      <div className="comment__list">
        {comments.map((comment) => (
          <p>
            <strong>{comment.user_name}</strong>
            {" " + comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__comment">
          <input
            className="post__comment__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <button
            onClick={postComment}
            type="submit"
            className="post__comment__button"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
