
import { makeStyles, Container, Avatar, Typography, Box, Input, } from '@material-ui/core';
import { useEffect } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Send } from '@material-ui/icons'
import chatbg6 from "../bgs/chatbg6.jpg"

const useStyles = makeStyles(theme => ({

    avBox: {
        display: "flex",
        flexDirection: "column",
        margin: "20px 0px 20px 0px",
        padding: "0px 40px 0px 10px",

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

        width: "fit-content",
        maxWidth: "fit-content",

        padding: "0px 4px 0px 4px",
        color: "darkblack",
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
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "white",
        position: 'relative',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundImage: `url(${chatbg6})`,

        backgroundPosition: "left top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 140vh",


    },

    container: {

        position: 'relative',
        bottom: "50px",
        backgroundImage: `url(${chatbg6})`,

        backgroundPosition: "center",

        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 100vh",


        padding: "15px 22px 15px 22px",

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
        margin: '12px 0px 12px 0px',
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
    }


}))


function ChatRoom(props) {

    useEffect(() => window.scrollTo(0, document.body.scrollHeight))

    const classes = useStyles()


    return (<>
        <Box component="div" className={classes.main}>
            <CssBaseline />
            <Container className={classes.container} maxWidth="md" >

                {props.gotMessage ? props.gotMessage.map((msg, idx) => {
                    return (
                        <Container key={idx} className={classes.avBox}  >

                            <Box className={classes.typobox}>
                                <Avatar className={classes.large}
                                    src={msg.userPhoto} />

                                <Typography className={classes.avname} color="textPrimary" variant="body1">{msg.userName}</Typography>
                            </Box>
                            <Typography className={classes.avTypo} variant="body2" gutterBottom>{msg.messageDb}</Typography>

                        </Container>
                    )
                }) : <h1>loading</h1>
                }

            </Container>
            <Container maxWidth="md" className={classes.footer}>
                <form className={classes.form} noValidate autoComplete="off">
                    <Input className={classes.input} value={props.message}
                        onChange={(e) => props.handleChange(e)} placeholder="Say Something..."
                        inputProps={{ 'aria-label': 'description' }} />

                    <Send className={classes.send} onClick={(e) => props.handleClick(e)} variant="contained">Send</Send>
                </form>
            </Container>


        </Box>
    </>
    )

}


export default ChatRoom;