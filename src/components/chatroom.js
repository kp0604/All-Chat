import { Button, TextField } from '@material-ui/core';


function ChatRoom(props) {
    
    const { uid, photoURL } = props.currentUser


    return (<div style={{ display: "flex", flexDirection: "column", }}>
        <Button onClick={props.signOut} variant="contained">SignOut</Button>
        <div>

            {props.gotMessage ? props.gotMessage.map((msg, idx) => {
                return (<div> <img src={photoURL}/>
             <h1 key={idx}>{msg.messageDb}</h1></div>)
            }) : <h1>loading</h1>
            }


        </div>
        <form className='' noValidate autoComplete="off">

            <TextField id="outlined-basic" value={props.message}
                onChange={(e) => props.handleChange(e)} label="Enter" variant="outlined" />
        </form>

        <Button onClick={(e) => props.handleClick(e)} variant="contained">Send</Button>

    </div>)


}


export default ChatRoom ;