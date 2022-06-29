import { Typography, Box, Button, Avatar } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../states/AuthState";
import dis3 from "./../imgs/dis3.webp";
import dis4 from "./../imgs/dis4.png";

function Front() {
  const [SignInWithGoogle, SignOut, currentUser] = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
  console.log(currentUser)
    currentUser ? navigate("/home") : navigate("/");
  }, [currentUser]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-around",
        alignItems: "center",
        backgroundImage: `url(${dis3})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "content-box",
        backgroundSize: "cover",
      }}
    >
      <Box display={"flex"} flexDirection={{xs:'column',md:'row'}} alignItems="center" mt={6}>
        <Avatar src={dis4} sx={{ width: "120px", height: "120px", mr: 2 }} />
        <Typography variant="h4" component="div" sx={{ color: "white" }}>
          Discord-Like
        </Typography>
      </Box>
      <Typography
        variant="h5"
        component="div"
        align="center"
        sx={{ bgcolor: "whitesmoke", mt: 4, p: 1, mx:2 }}
      >
        Join Discord-Like
      </Typography>
      <Typography
        variant="h5"
        component="div"
        align="center"
        sx={{ bgcolor: "whitesmoke", mt: 2, p: 1, mx:2 }}
      >
        A Discord Clone Demo Project
      </Typography>
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{ bgcolor: "whitesmoke", mt: 2, p: 1, mx:2 }}
      >
        share your thoughts in Servers and Channels...
      </Typography>
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{ bgcolor: "whitesmoke", mt: 2, p: 1, mx:2 }}
      >
        Happy Chatting !
      </Typography>
      <Button
        size="large"
        onClick={SignInWithGoogle}
        sx={{ mt: 6, bgcolor: "crimson", color: "white" }}
        variant="contained"
        startIcon={<GoogleIcon size="large" sx={{ mr: 2 }} />}
      >
        Sign-In With Google
      </Button>
    </Box>
  );
}

export default Front;
