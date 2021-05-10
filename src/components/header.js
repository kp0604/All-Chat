import { AppBar, Button, Typography, Toolbar, CssBaseline, Container } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    AppBar: {
       
        backgroundColor: "#00688B	",
       

    },

    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
})

function Header(props) {

    const classes = useStyles()

    return (
        <>
            <CssBaseline />
                <AppBar  className={classes.AppBar} >
            <Container maxWidth="md" >
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h5"  >
                            All-CHAT
                    </Typography>
                        {props.signedIn ?
                            <Button size="small" onClick={props.signOut} variant="contained"
                            >SignOut</Button>
                            :
                            <Button size="small" onClick={props.signInWIthGoogle} variant="contained">SignIn</Button>
                        }

                    </Toolbar>
            </Container>
                </AppBar>


        </>

    )

}

export default Header;