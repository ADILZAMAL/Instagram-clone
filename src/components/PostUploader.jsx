import { Button, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db, storage } from "../firebase";
import "../styles/PostUploader.css";

function PostUploader({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        //upload progress function
        let progressValue = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressValue);
      },

      (error) => {
        //error while uploading
        console.log(error);
        alert(error.message);
      },

      () => {
        //upload complete login
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              image_url: url,
              user_name: username,
            });
          });
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="postuploader">
      <progress className="postuploader__progress" value={progress} max="100" />
      <Input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(event) => {
          setCaption(event.target.value);
        }}
      />
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Post</Button>
    </div>
  );
}

export default PostUploader;
