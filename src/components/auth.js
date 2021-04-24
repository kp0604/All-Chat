import {
  Button,
  TextField,
} from "@material-ui/core";
// import { useState } from "react";


function Auth(props) {
    // const [emailValue,setEmail] = useState("")
    // const [passValue,setPass] = useState("")
    
   
  // const normalSignin =<div> <form noValidate autoComplete="off">
  //       <TextField id="email" value={emailValue} onChange={(e)=>setEmail(e.target.value)} label="Email" variant="outlined" />
  //       <TextField id="pass" value={passValue} onChange={(e) => setPass(e.target.value)} label="Password" variant="outlined" />
  //     </form>
  //           <Button onClick={() => props.makeauth(emailValue, passValue)}
  //     variant="contained">Default</Button></div>
  
  const googleSignIn = <div><Button onClick={props.signInWIthGoogle}
    variant="contained">Default</Button></div>

    return (

    <div>
      {googleSignIn}
    </div>
  );
}


export default Auth;