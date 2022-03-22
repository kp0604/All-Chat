
import { makeStyles, Container, Avatar, Typography, Box, Input, } from '@material-ui/core';
import { useEffect } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Send } from '@material-ui/icons'
import chatbg6 from "../bgs/chatbg6.jpg"

const useStyles = makeStyles(theme => ({

    avBox: {
        display: "flex",
        flexDirection: "column",
        // alignItems:'end',
        margin: "35px 0px 35px 0px",
        padding: "0px 0px 0px 0px",

    }
    ,

    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },

    typobox: {
        display: "flex",
        alignItems: "center",

    }
    ,
    avname: {

        // width: "fit-content",
        // maxWidth: "fit-content",

        padding: "0px 4px 0px 4px",
        color: "black",
        margin: "0px 0px 0px 10px",

    },

    avTypo: {

        maxWidth: "fit-content",
        wordWrap: "break-word",
        padding: "6px 10px 6px 10px",
        margin: "5px 0px 5px 55px",

        backgroundColor: "whitesmoke",
        borderRadius: "0px 12px 12px 12px",


    }
    ,



    main: {
        // minHeight:'80vh',
        height:'80vh',
        overflowY:'scroll',
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: "white",
        position: 'relative',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        // backgroundImage: `url(${chatbg6})`,

        // backgroundPosition: "left top",
        // backgroundAttachment: "fixed",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "100vw 140vh",


    },

    container: {
        height:  'calc(100vh - 150px)',
        overflowY:'scroll',
        position: 'relative',
        // listStyle:'none',
        // bottom: "50px",
        // backgroundImage: `url(${chatbg6})`,
        // backgroundColor: 'rgb(255,255,255)',

        // backgroundPosition: "center",

        // backgroundAttachment: "fixed",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "100vw 100vh",
        
        padding: "10px 40px 10px 40px",
        margin: "0px 0px 0px 0px",

        
    }
    ,

    contypo: {
        position: "relative",
        color: "white",
        top: "10vh",
    }
    ,
    chats: {
        position: "relative",
        top: "15vh",
        height: "80vh",

        padding: "13px",
    }
    ,
    footer: {
        backgroundColor: "#00688B",
        display: "flex",
        position: 'fixed',
        bottom: '0',
        justifyContent: "center",

    },

    form: {

        alignSelf: 'center',
        display: 'flex',
        backgroundColor: 'whitesmoke',
        borderRadius: '10px',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: '10px 0px 10px 0px',
        padding: '7px',
        width: '100%',

    }
    ,

    input: {

        flexGrow: '0.9',
        flexBasis: '1',
        flexShrink: '1',

    }
    ,

    send: {
        flexGrow: '0.05',
        flexBasis: '1',
        flexShrink: '1',
        cursor:'pointer'
    }


}))


function ChatRoom(props) {

    console.log(props.gotMessage)

    useEffect(() => window.scrollTo(0, document.body.scrollHeight))

    const classes = useStyles()


    return (<>
        {/* <Box component="div" className={classes.main}> */}
            {/* <CssBaseline /> */}
            <ul className={classes.container} >
                {props.gotMessage ? props.gotMessage.map((msg, idx) => {
                    return (
                        <li key={idx} className={classes.avBox}  >
                            
                            <div className={classes.typobox}>
                                <Avatar className={classes.large} style={{justifySelf:'end'}}
                                    src={msg.userPhoto} />

                                <Typography className={classes.avname} color="textPrimary" variant="body1">{msg.userName}</Typography>
                            </div>
                            <Typography className={classes.avTypo} variant="body2" gutterBottom>{msg.messageDb}</Typography>

                        </li>
                    )
                }) : <h1>loading</h1>
                }

            </ul>
        {/* </Box> */}
            <Container maxWidth="sm" className={classes.footer}>
                <form className={classes.form} noValidate autoComplete="off">
                    <Input className={classes.input} value={props.message}
                        onChange={(e) => props.handleChange(e)} placeholder="Say Something..."
                        inputProps={{ 'aria-label': 'description' }} />

                    <Send className={classes.send} onClick={(e) => props.handleClick(e)} variant="contained">Send</Send>
                </form>
            </Container>


    </>
    )

}


export default ChatRoom;