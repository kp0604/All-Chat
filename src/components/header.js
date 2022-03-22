import { AppBar, Button, Typography, Toolbar, CssBaseline, Container } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    AppBar: {
       
        backgroundColor: "#00688B",
       position:'sticky',
       top:'0',

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
        <AppBar className={classes.AppBar} position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h5">All-CHAT</Typography>
            {props.signedIn ? (
              <Button size="small" onClick={props.signOut} variant="contained">
                Sign-Out
              </Button>
            ) : (
              <Button
                size="small"
                onClick={props.signInWIthGoogle}
                variant="contained"
              >
                Sign-In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </>
    );

}

export default Header;