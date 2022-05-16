import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TagIcon from "@mui/icons-material/Tag";

import { AuthContext } from "../states/AuthState";

import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase_config";
import { CurSerStateContext } from "../states/CurrentServerState";
import { CurChanStateContext } from "../states/CurrentChannelState";
import AvatarComp from "../components/AvatarComp";

function Navs() {
  const [, , currentUser, currentUserDb] = useContext(AuthContext);
  const [curServInfo, curServId] = useContext(CurSerStateContext);
  const [, setloadingChat] = useContext(CurChanStateContext);

  const navigate = useNavigate();

  useEffect(() => (curServId ? getChatRooms() : null), [curServId]);
  useEffect(() => (curServInfo ? getCurServOwnerInfo() : null), [curServInfo]);

  const [curServOwnerInfo, setcurServOwnerInfo] = useState(null);

  const getCurServOwnerInfo = async () => {
    console.log(curServInfo);
    const docRef = doc(db, "users", `${curServInfo.ownerDocId}`);
    const docSnap = await getDoc(docRef);

    setcurServOwnerInfo(docSnap.data());
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>chatRooms>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [chatRooms, setChatRooms] = useState([]);

  const colRef = collection(db, "servers", `${curServId}`, "chatrooms");
  const q = query(colRef);

  const getChatRooms = async () => {
    const querySnap = await getDocs(q);
    setChatRooms(
      querySnap.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  // onSnapshot(q, (snapshot) => {
  //   setChatRooms(
  //     snapshot.docs.map((doc) => {
  //       return { ...doc.data(), id: doc.id };
  //     })
  //   );
  // });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>....

  // >>>>>>>>>>>>>>>>>>>>>>>>>> add chatrooms>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [newChatroom, setNewChatroom] = useState("");

  const addNewChatroom = () => {
    const colRef = collection(db, "servers", `${curServId}`, "chatrooms");
    if (newChatroom !== "") {
      addDoc(colRef, {
        createdAt: serverTimestamp(),
        ownerId: currentUser.uid,
        chatroomName: newChatroom,
      });
    }
    setNewChatroom("");
    getChatRooms();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewChatroom(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNewChatroom();
    setOpen(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Addd  Dialog    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    handleCloseM();
  };

  const handleClose = () => {
    setOpen(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Menu  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [anchorEl, setAnchorEl] = useState(null);
  const openM = Boolean(anchorEl);
  const handleClickM = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseM = () => {
    setAnchorEl(null);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Menu Confirm Dialog <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const [openDcd, setOpenDcd] = useState(false);
  const [openLcd, setOpenLcd] = useState(false);

  const handleClickDcd = () => {
    setAnchorEl(null);
    setOpenDcd(true);
  };

  const handleClickLcd = () => {
    setAnchorEl(null);
    setOpenLcd(true);
  };

  const leaveServer = async () => {
    let arr = curServInfo.members.filter((mem) => mem !== curServId);
    const docRef = doc(db, "servers", `${curServId}`);
    await updateDoc(docRef, { members: arr });
    let arr1 = currentUserDb.serversFollowed.filter(
      (ser) => ser !== currentUserDb.id
    );
    const docRef1 = doc(db, "users", `${currentUserDb.id}`);
    await updateDoc(docRef1, { serversFollowed: arr1 });
    navigate("/home");
  };

  const delServer = async () => {
    await deleteDoc(doc(db, "servers", `${curServId}`));
    navigate("/home");
  };

  const handleCloseDcd = () => {
    setOpenDcd(false);
  };
  const handleCloseLcd = () => {
    setOpenLcd(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <Box component="div" sx={{ height: "100%", bgcolor: "primary.light" }}>
      {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   header   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}
      <AppBar position="static" sx={{ bgcolor: "primary.light" }}>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 0,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            align="center"
            color="black"
            sx={{ fontWeight: 500 }}
          >
            {curServInfo
              ? curServInfo.serverName.charAt(0).toUpperCase() +
                curServInfo.serverName.slice(1)
              : "Server Name..."}
          </Typography>
          {curServId && curServInfo ? (
            <Button
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ color: "black" }}
              id="basic-button"
              aria-controls={openM ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openM ? "true" : undefined}
              onClick={handleClickM}
            ></Button>
          ) : null}

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Menu <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 60, left: 330 }}
            open={openM}
            onClose={handleCloseM}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <Typography align="center" variant="subtitle2">
                Owner :
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }} my={2}>
                <AvatarComp
                  name={curServOwnerInfo ? curServOwnerInfo.userName : ""}
                  type={"circular"}
                  sx={{ mx: 1 }}
                />
                <Typography align="center" variant="subtitle2">
                  {curServOwnerInfo ? curServOwnerInfo.userName : ""}
                </Typography>
              </Box>
            </MenuItem>
            {curServInfo && curServInfo.ownerId === currentUser.uid ? (
              <>
                <MenuItem>
                  <Button
                    gutterBottom="true"
                    size="small"
                    color="info"
                    onClick={handleClickOpen}
                    variant="contained"
                    startIcon={<AddIcon fontSize="small" />}
                  >
                    Add New Channel
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClickDcd}>
                  <Typography align="center" variant="subtitle2" color="error">
                    Delete Server
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleClickLcd}>
                <Typography align="center" variant="subtitle2" color="error">
                  Leave Server
                </Typography>
              </MenuItem>
            )}
          </Menu>

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. */}

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Menu Delete confirmation dialog <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

          <Dialog open={openDcd} onClose={handleCloseDcd}>
            <DialogTitle>Delete Sever Permanently</DialogTitle>
            <DialogActions>
              <Button color="error" onClick={handleCloseDcd}>
                Cancel
              </Button>
              <Button color="info" onClick={() => delServer()}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Menu Leave confirmation dialog <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

          <Dialog open={openLcd} onClose={handleCloseLcd}>
            <DialogTitle>Leave Sever Permanently</DialogTitle>
            <DialogActions>
              <Button color="error" onClick={handleCloseLcd}>
                Cancel
              </Button>
              <Button color="info" onClick={() => leaveServer()}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        </Toolbar>
      </AppBar>

      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Subheader  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}
      <Box
        sx={{
          p: 2,
          // height: "calc(100vh - 80px)",
          bgcolor: "primary.light",
        }}
        height={0.79}
      >
        <Typography
          variant="subtitle2"
          component="div"
          gutterBottom="true"
          sx={{
            width: "100%",
            bgcolor: "primary.light",
            mb: 2,
            display: "inline-flex",
          }}
        >
          <ArrowRightIcon fontSize="small" /> Channels
        </Typography>
        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}

        <Stack spacing={3} alignItems="center">
          {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> fetched chatrooms  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

          {chatRooms.length ? (
            chatRooms.map((cR, idx) => (
              <Link
                to={`/home/${curServId}/${cR.id}`}
                key={idx}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Paper
                  variant="outlined"
                  key={idx}
                  sx={{ width: "100%", py: 1, display: "flex" }}
                  onClick={() => setloadingChat(true)}
                >
                  <TagIcon sx={{ mx: 2 }} />
                  <Typography
                    variant="body1"
                    key={idx}
                    component="div"
                    align="center"
                  >
                    {cR.chatroomName.charAt(0).toUpperCase() +
                      cR.chatroomName.slice(1).toLowerCase()}
                  </Typography>
                </Paper>
              </Link>
            ))
          ) : (
            <Box mt={2}>
              <Typography
                align="center"
                variant="subtitle1"
                component="div"
                color="primary.dark"
                sx={{ fontWeight: 400 }}
              >
                Nothing Selected...
              </Typography>
              <Typography
                align="center"
                variant="caption"
                component="div"
                color="primary.dark"
              >
                Channels in the selected server will show up here...
              </Typography>
            </Box>
          )}
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>     dialog to add chatrooms  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Chatroom Name:</DialogTitle>
            <DialogContent>
              <TextField
                color="info"
                autoFocus
                margin="dense"
                id="name"
                label="New Chatroom"
                type="text"
                fullWidth
                variant="standard"
                value={newChatroom}
                onChange={(e) => handleChange(e)}
              />
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="info" onClick={(e) => handleClick(e)}>
                Create
              </Button>
            </DialogActions>
          </Dialog>

          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
        </Stack>
      </Box>

      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  user data box <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

      <Box
        bgcolor="primary.main"
        p={1}
        display="inline-flex"
        maxWidth={1}
        minWidth={0.94}
        alignItems="center"
      >
        <AvatarComp src={currentUser.photoURL} sx={{ mr: 2 }} />
        <Typography align="center" variant="subtitle2" color="primary.dark">
          {currentUser.displayName}
        </Typography>
      </Box>

      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
    </Box>
  );
}

export default Navs;
