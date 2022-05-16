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
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import TagIcon from "@mui/icons-material/Tag";

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

function ChatRoom() {
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

  useEffect(() => (curChanId ? getMessages() : null), [curChanId]);

  const q = query(colRef, orderBy("createdAt"));

  const [gotMessage, setgotMessage] = useState([]);

  const scrollRef = useRef(null);

  const getMessages = async () => {
    console.log(curChanId);
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

  return (
    <Box height={1}>
      <AppBar position="static" sx={{ boxShadow: 1, bgcolor: "white" }}>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "none",
          }}
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
          <Box sx={{ borderLeft: "2px solid grey", pl: 2 }}>
            {currentUser ? (
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={SignOut}
              >
                Sign-Out
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      {/*  */}
      <Grid container spacing={0} height={0.92}>
        <Grid item xs={curServId ? 9 : 12} height={1}>
          <Box height={1}>
            <Stack
              sx={{
                px: 4,
                py: 4,
                // height: "calc(100vh - 250px)",
                overflowY: "scroll",
              }}
              // maxHeight={0.9}
              height={0.77}
              spacing={4}
            >
              {gotMessage.length && !loadingChat ? (
                gotMessage.map((msg, idx) => {
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
                })
              ) : loadingChat ? (
                <ChatLoading />
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height={1}
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
              <div ref={scrollRef}></div>
            </Stack>

            <Box sx={{ px: 3, pt: 1 }}>
              <OutlinedInput
                onKeyPress={(e) => handleKeyPress(e)}
                disabled={gotMessage.length ? false : true}
                sx={{ bgcolor: "primary.main" }}
                value={message}
                onChange={(e) => handleInput(e)}
                placeholder="Say Something..."
                size="small"
                endAdornment={
                  <InputAdornment>
                    <Button
                      size="large"
                      endIcon={
                        <SendIcon
                          sx={{ color: "primary.dark" }}
                          fontSize="large"
                        />
                      }
                      onClick={(e) => handleSend(e)}
                    ></Button>
                  </InputAdornment>
                }
                fullWidth
              ></OutlinedInput>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          height={1}
          sx={{ display: curServId ? "block" : "none" }}
        >
          <Members />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatRoom;
