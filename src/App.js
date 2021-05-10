
import "./App.css";
import { db, firebase, auth } from "./firebase_config";
import { useEffect, useState } from "react";
import ChatRoom from "./components/chatroom";

import Header from './components/header'
import Home from './components/home'


function App() {
  const [message, setMessage] = useState("");
  const [gotMessage, setgotMessage] = useState([]);
  const [signedIn, setSignedin] = useState(false);
  
  useEffect(() => {
    getDb()
    auth.onAuthStateChanged(setSignedin)
  }, []);

  
  const addDb = () => {
    
    if (message != "") {
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
  
  return (
    <>
      <Header signOut={SignOut} signedIn={signedIn} signInWIthGoogle={signInWIthGoogle} />
      {signedIn ?
        <ChatRoom
        gotMessage={gotMessage}
        message={message}
        handleChange={(e) => handleChange(e)}
        handleClick={(e) => handleClick(e)}
        /> :<Home/>
        
      }
    </>
  );
}

export default App;
