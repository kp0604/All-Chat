import {
  Box,
  Typography,
  AppBar,
  Button,
  Toolbar,
  Stack,
  OutlinedInput,
  InputAdornment,
  Grid,
  SwipeableDrawer,
  textFieldClasses,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import TagIcon from "@mui/icons-material/Tag";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { db } from "../firebase_config";
import { AuthContext } from "../states/AuthState";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
  getDocs,
  doc,
} from "firebase/firestore";
import Members from "./Members";
import { CurChanStateContext } from "../states/CurrentChannelState";
import { CurSerStateContext } from "../states/CurrentServerState";
import AvatarComp from "./AvatarComp";
import dis1 from "./../imgs/dis1.png";
import ChatLoading from "./ChatLoading";
import Serverrooms from "./Serverrooms";
import Navs from "./Navs";
// import Members from "./Members";

function Chats() {
  const [, SignOut, currentUser] = useContext(AuthContext);
  const [, curServId] = useContext(CurSerStateContext);
  const [curChanId, setloadingChat, loadingChat] =
    useContext(CurChanStateContext);

  const colRef = collection(
    db,
    "servers",
    `${curServId}`,
    "chatrooms",
    `${curChanId}`,
    "messages"
  );

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Header>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  const [chatroom, setChatroom] = useState(null);

  const docRef = doc(
    db,
    "servers",
    `${curServId}`,
    "chatrooms",
    `${curChanId}`
  );
  const docSnap = query(docRef);
  onSnapshot(docSnap, (snapshot) => {
    setChatroom(snapshot.data());
  });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>SendMessage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      getMessages();
    }
  };

  const sendMessage = async () => {
    setMessage("");
    const data = {
      ownerName: currentUser.displayName,
      ownerId: currentUser.uid,
      ownerPhoto: currentUser.photoURL,
      message: message,
      createdAt: serverTimestamp(),
    };
    if (message !== "") {
      const docRef = await addDoc(colRef, data);

      // onSnapshot(q, (snapshot) => {
      //   setgotMessage(
      //     snapshot.docs.map((doc) => {
      //       return { ...doc.data(), id: doc.id };
      //     })
      //   );

      //   })
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
    getMessages();
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>get Message>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => (curChanId ? getMessages() : setgotMessage([])), [curChanId]);
  // console.log(curChanId)5

  const q = query(colRef, orderBy("createdAt"));

  const [gotMessage, setgotMessage] = useState([]);

  const scrollRef = useRef(null);

  const getMessages = async () => {
    const querySnap = await getDocs(q);
    setgotMessage(
      querySnap.docs.map((doc) => {
        return { ...doc.data() };
      })
    );
    setloadingChat(false);
    await scrollRef.current?.scrollIntoView();
  };

  // onSnapshot(q, (snapshot) => {
  //   setgotMessage(
  //     snapshot.docs.map((doc) => {
  //       return { ...doc.data(), id: doc.id };
  //     })
  //   );

  //   })

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar elevation={1} position="static" sx={{ bgcolor: "transparent" }}>
        <Toolbar
          variant="dense"
          sx={{
            // display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            p: 0,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={2}
              md={0}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Button
                color="info"
                onClick={() => setopen1(true)}
                startIcon={<ArrowForwardIosIcon fontSize="small" />}
              ></Button>
            </Grid>
            <Grid item xs={8} md={12}>
              <Box
                width={1}
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  alignItems="center"
                  sx={{
                    display: "inline-flex",
                  }}
                >
                  <TagIcon sx={{ mr: 2 }} />
                  {chatroom
                    ? chatroom.chatroomName.charAt(0).toUpperCase() +
                      chatroom.chatroomName.slice(1).toLowerCase()
                    : "Channel Name..."}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              md={0}
              sx={{ display: { xs: curServId ? "block" : "none", md: "none" } }}
            >
              <Button
                color="info"
                onClick={() => setopen2(true)}
                endIcon={<ArrowBackIosNewIcon fontSize="small" />}
              ></Button>
            </Grid>
          </Grid>
          <SwipeableDrawer
            anchor={"left"}
            open={open1}
            onClose={() => setopen1(false)}
            onOpen={() => setopen1(true)}
          >
            <Grid container sx={{ height: "100%" }}>
              <Grid item xs={3}>
                <Serverrooms />
              </Grid>
              <Grid item xs={9}>
                <Navs />
              </Grid>
            </Grid>
          </SwipeableDrawer>
          <SwipeableDrawer
            anchor={"right"}
            open={open2}
            onClose={() => setopen2(false)}
            onOpen={() => setopen2(true)}
          >
            <Members />
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      {curChanId ? (
        <Stack
          sx={{
            px: 4,
            pt: 2,
            overflowY: "scroll",
            flexGrow: 1,
            flexBasis: 1,
            flexShrink: 1,
          }}
          spacing={4}
        >
          {gotMessage && !loadingChat ? (
            <>
              <Box mt={4}>
                <Typography variant="h5" alignItems="center" justifyContent="center" sx={{display:'flex'}}>Welcome to <TagIcon sx={{ml:1,color:'crimson'}}/> {chatroom.chatroomName.charAt(0).toUpperCase() +
                      chatroom.chatroomName.slice(1).toLowerCase()}</Typography>
                <Typography variant="h5" align="center" mt={2}>Share your views... ✌️✌️</Typography>
                {/* <Typography variant="h6" align="center">Happy Chatting !!</Typography> */}
              </Box>
              {gotMessage.map((msg, idx) => {
                return (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <AvatarComp
                      sx={{ width: 40, height: 40, mr: 3 }}
                      src={msg.ownerPhoto}
                    />
                    <Box maxWidth={0.9}>
                      <Typography
                        variant="subtitle1"
                        color="darkOrange"
                        component="div"
                      >
                        {msg.ownerName}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ wordWrap: "break-word", maxWidth: 1 }}
                      >
                        {msg.message}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </>
          ) : (
            <Stack spacing={4}>
              <ChatLoading />
            </Stack>
          )}
          <Box ref={scrollRef}></Box>
        </Stack>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1, px: 2 }}
        >
          <AvatarComp
            src={dis1}
            sx={{ height: "200px", width: "200px", mb: 4 }}
            type={"rounded"}
          />
          <Typography variant="h6" component="h6" align="center">
            Select the Channel you like and Chat with members....
          </Typography>
        </Box>
      )}
      <Box sx={{ px: 3, py: 2 }}>
        <OutlinedInput
          onKeyPress={(e) => handleKeyPress(e)}
          disabled={gotMessage.length ? false : true}
          sx={{ bgcolor: "primary.main" }}
          value={message}
          onChange={(e) => handleInput(e)}
          placeholder="Say Something..."
          size="small"
          endAdornment={
            <InputAdornment position="start">
              <Button
                size="large"
                endIcon={
                  <SendIcon sx={{ color: "primary.dark" }} fontSize="large" />
                }
                onClick={(e) => handleSend(e)}
              ></Button>
            </InputAdornment>
          }
          fullWidth
        ></OutlinedInput>
      </Box>
    </Box>
  );
}

export default Chats;
