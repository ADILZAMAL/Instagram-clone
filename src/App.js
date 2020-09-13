import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { Button, Input, makeStyles } from "@material-ui/core";
import PostUploader from "./components/PostUploader";
import InstagramEmbed from "react-instagram-embed";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User is loged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //User is not loged in
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) => {
        setPosts(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signup = (event) => {
    event.preventDefault();
    setOpen(false);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signin = (event) => {
    event.preventDefault();
    setOpenSignIn(false);
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={signup} className="app__signup">
            <center>
              <img
                src="https:instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="gdkls"
                className="app__header__img"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button type="submit">SIGN UP</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={signin} className="app__signup">
            <center>
              <img
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="gdkls"
                className="app__header__img"
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button type="submit">SIGN In</Button>
          </form>
        </div>
      </Modal>

      {/* header */}
      <div className="app__header">
        <img
          src="https:instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="gdkls"
          className="app__header__img"
        />
        <div className="app__header__button">
          {user ? (
            <Button
              onClick={() => {
                auth.signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Button onClick={() => setOpen(true)}>SIGN UP</Button>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            </div>
          )}
        </div>
      </div>

      {/* post */}
      <div className="app__post">
        <div className="app__post__left">
          {posts.map(({ id, post }) => {
            return <Post key={id} user={user} postId={id} post={post} />;
          })}
        </div>
        <div className="app__post__right"></div>
        <InstagramEmbed
          url="https://instagr.am/p/Zw9o4/"
          maxWidth={320}
          hideCaption={false}
          containerTagName="div"
          protocol=""
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div>
      {user?.displayName ? (
        <PostUploader username={user.displayName} />
      ) : (
        <h3>You need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
