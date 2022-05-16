import { Typography, Box, Button, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthContext } from "../states/AuthState";
import dis3 from "./../imgs/dis3.webp";
import dis4 from "./../imgs/dis4.png";

const useStyles = makeStyles({
  home: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${dis3})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "content-box",
    backgroundSize: "cover",
  },

  typo: {
    backgroundColor: "white",
    width: "fit-content",
    padding: "5px",
  },
});

function Front() {
  const classes = useStyles();

  const [SignInWithGoogle, SignOut, currentUser] = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    currentUser ? navigate("/home") : navigate("/");
  }, [currentUser]);

  return (
    <>
      <Box className={classes.home}>
        <Box display={"inline-flex"} alignItems="center" mb={4}>
          <Avatar src={dis4} sx={{ width: "120px", height: "120px", mr: 2 }} />
          <Typography variant="h4" component="div" color="textPrimary">
            Discord-Like
          </Typography>
        </Box>
        <Typography
          className={classes.typo}
          variant="h4"
          component="div"
          color="textPrimary"
        >
          Join Discord-Like a Discord Clone Demo Project
        </Typography>
        <Typography
          className={classes.typo}
          variant="h5"
          component="div"
          color="textPrimary"
        >
          share your thoughts in Servers and Channels...
        </Typography>
        <Typography
          className={classes.typo}
          variant="h5"
          component="div"
          color="textPrimary"
        >
          Happy Chatting !
        </Typography>
        <Button
          size="medium"
          onClick={SignInWithGoogle}
          color="secondary"
          sx={{ mt: 4 }}
          variant="contained"
        >
          <GoogleIcon size="large" sx={{ mr: 2 }}></GoogleIcon>Sign-In With
          Google
        </Button>
      </Box>
    </>
  );
}

export default Front;
