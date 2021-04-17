// import logo from './logo.svg';
import './App.css';
import { db,firebase } from './firebase_config'
import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState("")
  const [gotMessage, setgotMessage] = useState([])

  console.log(gotMessage)

  const addDb = () => {
    db.collection('pi').add({ messageDb: message,time:firebase.firestore.FieldValue.serverTimestamp() })
    setMessage("")

  }


  const getDb = () => {
    db.collection('pi').orderBy('time').onSnapshot((querySnapshot) =>
      setgotMessage(...gotMessage, querySnapshot.docs.map((doc) => {
        console.log(doc.data())
        return  doc.data()
      }
      )
      )
    )
  }

  useEffect(() => getDb(), [])


  const handleChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
    console.log(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    addDb()

  }


  return (
    <div style={{ display: "flex", flexDirection: "column", }}>
      <div>
        {gotMessage.map((msg, idx) => { return <h1 key={idx}>{msg.messageDb}</h1> })}
      </div>
      <form className='' noValidate autoComplete="off">

        <TextField id="outlined-basic" value={message} onChange={(e) => handleChange(e)} label="Enter" variant="outlined" />
      </form>

      <Button onClick={(e) => handleClick(e)} variant="contained">Send</Button>

    </div>
  );
}

export default App;
