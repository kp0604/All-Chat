// import logo from './logo.svg';
import "./App.css";
import { db, firebase, auth } from "./firebase_config";
import { useEffect, useState } from "react";
import ChatRoom from "./components/chatroom";
import Auth from "./components/auth"

function App() {
  const [message, setMessage] = useState("");
  const [gotMessage, setgotMessage] = useState([]);
  const [signedIn, setSignedin] = useState(false)
  
  console.log(gotMessage);
  
  useEffect(() => {
    getDb()
    auth.onAuthStateChanged(setSignedin)
  }, []);
  
  const addDb = () => {
    db.collection("pi").add({
      messageDb: message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };

  const getDb = () => {
    db.collection("pi")
      .orderBy("time")
      .onSnapshot((querySnapshot) =>
        setgotMessage(
          ...gotMessage,
          querySnapshot.docs.map((doc) => {
            console.log(doc.data());
            return doc.data();
          })
        )
      );
  };

  // const makeAuth = (email, password) => {
  //   console.log(email)
  //   auth.createUserWithEmailAndPassword(email, password).then((response) =>
  //   { console.log(response); setSignedin(true) })
  // }
  
  

  const signInWIthGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
      // .then(() => setSignedin(true))

  }
  
  
   
  const SignOut = () => {
    console.log("signout")
    console.log(auth.currentUser)
    auth.signOut()
    //   .then(() =>
    // setSignedin(false))
  }
  
 

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    console.log(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addDb();
  };

  return (
    <>
      {signedIn?
        <ChatRoom
          currentUser={auth.currentUser}
        gotMessage={gotMessage}
          message={message}
          signOut={SignOut}
        handleChange={(e) => handleChange(e)}
        handleClick={(e) => handleClick(e)}
      />:
        // <Auth makeauth={(emailValue, passValue) => { makeAuth(emailValue, passValue) }} />
        <Auth signInWIthGoogle ={signInWIthGoogle} />
      
      }
    </>
  );
}

export default App;
