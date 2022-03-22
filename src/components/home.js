import { Typography, makeStyles,  Box } from "@material-ui/core";

import chatbg6 from "../bgs/chatbg6.jpg"


const useStyles = makeStyles({

    home: {
       
        // backgroundImage: `url(${chatbg6})`,
     
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      
        // position: "fixed",
      
        // width: "100vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
  

    },

   

    typo: {
       
        backgroundColor: '#fafafa',
        width:"fit-content",
        padding: '5px',
       
    }


})


function Home(props) {

    const classes = useStyles()


    return (
        <>

            <Box className={classes.home}  >

                <Typography className={classes.typo} variant="h4" color="textPrimary" >Join Our Chat Server</Typography>
                <Typography className={classes.typo} variant="h5" color="textPrimary" >share your thoughts..</Typography>
                <Typography className={classes.typo} variant="h5" color="textPrimary" >Happy Chatting !</Typography>
            </Box>
            
        </>
    )


}

export default Home;