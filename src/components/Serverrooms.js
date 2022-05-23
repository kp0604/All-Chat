import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Tooltip,
  Typography
} from "@mui/material";
import { AuthContext } from "../states/AuthState";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { db } from "../firebase_config";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import ServersinEx from "./ServersinEx";
import AvatarComp from "./AvatarComp";
import dis2 from "./../imgs/dis2.png";

function Serverrooms() {
  const [, , currentUser, currentUserDb] = useContext(AuthContext);
  
  useEffect(() => {
    getServersFollInfo();
  }, [currentUserDb]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Selected Server <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const [selSer,setSelSer] = useState("")

  const handleSelect = (id)=>{
    setSelSer(id)
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Dialog Explore   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [openE, setOpenE] = useState(false);

  const handleClickOpenE = () => {
    getAllServers();
    setOpenE(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Dialog Add    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Get Followed Servers   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [serversFoll, setServersFoll] = useState([]);

  const getServersFollInfo = () => {
    let arr =
      currentUserDb && currentUserDb.serversFollowed
        ? currentUserDb.serversFollowed
        : [];

    let serFol = [];

    if (arr.length !== 0) {
      arr.forEach(async (ser, idx) => {
        let docRef = doc(db, "servers", `${ser}`);
        const docSnap = await getDoc(docRef);
        let a = await docSnap.data();
        a.id = ser;
        setServersFoll([...serFol, a]);
        serFol.push(a);
      });
    }
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Get All Servers    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [servers, setServers] = useState([]);

  const colRef = collection(db, "servers");

  const q = query(colRef, orderBy("createdAt"));

  const getAllServers = async () => {
    const querySnap = await getDocs(q);
    let allServers = [];
    querySnap.docs.forEach((doc) => {
      if (!currentUserDb.serversFollowed.includes(doc.id)) {
        allServers.push({ ...doc.data(), id: doc.id });
      }
    });
    setServers(allServers);
  };

  // onSnapshot(q, (snapshot) => {
  //   setServers(
  //     snapshot.docs.map((doc) => {
  //       return { ...doc.data(), id: doc.id };
  //     })
  //   );
  // });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Add  New Server  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [newServer, setNewServer] = useState("");

  const addServer = () => {
    if (newServer !== "") {
      addDoc(colRef, {
        createdAt: serverTimestamp(),
        ownerId: currentUser.uid,
        ownerDocId:currentUserDb.id,
        serverName: newServer,
      });
    }
    setNewServer("");
    getAllServers();
  };

  const handleInput = (e) => {
    e.preventDefault();
    setNewServer(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addServer();
    setOpen(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <Box component="div" sx={{ height: "100%", bgcolor: "primary.main" }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Server Name:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Server"
            type="text"
            fullWidth
            variant="standard"
            value={newServer}
            color="info"
            onChange={(e) => handleInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={(e) => handleAdd(e)}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openE}
        onClose={handleCloseE}
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle>Explore Servers...</DialogTitle>
        <DialogContent>
          <Stack spacing={3} alignItems="center" sx={{ p: 3 }}>
            {servers.length !== 0 ? (
              servers.map((server, idx) => (
                <ServersinEx server={server} idx={idx} />
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
                Our Platform is growing....
              </Typography>
              <Typography
                align="center"
                variant="subtitle1"
                component="div"
                color="primary.dark"
                sx={{ fontWeight: 400 }}
              >
                More Servers will be added Soon !
              </Typography>
            </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseE} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={3} alignItems="center" sx={{ p: 1 }}>
        <Box borderBottom="2px solid lightgrey" py={1}>
          <AvatarComp
            src={dis2}
            sx={{ height: "30px", width: "30px", bgcolor: "white", p: 1 }}
            type={"circular"}
          />
        </Box>

        {serversFoll.length? (
          serversFoll.map((server, idx) => (
            <Link
              to={`/home/${server.id}`}
              key={idx}
              style={{ textDecoration: "none" }}
            onClick={()=>handleSelect(server.id)}
            >
              <AvatarComp name={server.serverName} type={"rounded"} sx={selSer === server.id?({border:'2px solid black'}):null} />
            </Link>
          ))
        ) : (
          <h4>Loading...</h4>
        )}
        <Tooltip title="Make Your Own Server" arrow placement="right">
          <Button onClick={handleClickOpen}>
            <AddCircleOutlineIcon
              sx={{
                color: "primary.dark",
                borderTop: "2px solid lightgrey",
                pt: 1,
              }}
              fontSize="large"
            ></AddCircleOutlineIcon>
          </Button>
        </Tooltip>
        <Tooltip title="Explore All Servers" arrow placement="right">
          <Button onClick={handleClickOpenE}>
            <ExploreIcon
              sx={{ color: "primary.dark" }}
              fontSize="large"
            ></ExploreIcon>
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default Serverrooms;
