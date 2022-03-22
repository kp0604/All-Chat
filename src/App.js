
import "./App.css";
import { db, firebase, auth } from "./firebase_config";
import { useEffect, useState } from "react";
import ChatRoom from "./components/chatroom";
import {Container,makeStyles,} from '@material-ui/core';
import chatbg6 from "./bgs/chatbg6.jpg"


import Header from './components/header'
import Home from './components/home'

const useStyles = makeStyles({

  ho: {
     
      // backgroundImage: `url(${chatbg6})`,
   
      // backgroundPosition: "center",
      // backgroundRepeat: "no-repeat",
      // backgroundSize: "cover",
    backgroundColor:'lightblue',
      // position: "fixed",
    
      // width: "100vw",
      height: "100vh",
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "center",
      // alignItems: "center",
      padding:'0px',


  },
})


function App() {
  const [message, setMessage] = useState("");
  const [gotMessage, setgotMessage] = useState([]);
  const [signedIn, setSignedin] = useState(false);
  
  useEffect(() => {
    getDb()
    auth.onAuthStateChanged(setSignedin)
  }, []);

  
  const addDb = () => {
    
    if (message !== "") {
      db.collection("pi").add({
        userName:auth.currentUser.displayName,
        userUID: auth.currentUser.uid,
        userPhoto: auth.currentUser.photoURL,
        messageDb: message,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setMessage("");
  };
  
  const getDb = () => {
    db.collection("pi")
    .orderBy("created_at")
    .onSnapshot((querySnapshot) =>
    setgotMessage(
      ...gotMessage,
      querySnapshot.docs.map((doc) => {
       
        return doc.data();
      })
      )
      );
    };
      
      const signInWIthGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
         
      }
      
      const SignOut = () => {
       
        firebase.auth().signOut()
        auth.onAuthStateChanged(setSignedin)
     
      }
      
      const handleChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
        
      };
      
  const handleClick = (e) => {
    e.preventDefault();
    addDb();
  };

  

  const classes = useStyles()    
  
  return (
    // <>
    <Container maxWidth="sm" className={classes.ho}> 
      <Header signOut={SignOut} signedIn={signedIn} signInWIthGoogle={signInWIthGoogle} />
      {signedIn ?
        <ChatRoom
        gotMessage={gotMessage}
        message={message}
        handleChange={(e) => handleChange(e)}
        handleClick={(e) => handleClick(e)}
        /> :<Home/>
        
      }
      {/* <Home/> */}
    </Container>
    // </>
  );
}

export default App;
