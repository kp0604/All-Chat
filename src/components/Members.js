import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, Stack, AppBar, Toolbar, Button } from "@mui/material";
import {
  collection,
  query,
  getDoc,
  getDocs,
  doc,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../firebase_config";
import { CurSerStateContext } from "../states/CurrentServerState";
import { AuthContext } from "../states/AuthState";
import AvatarComp from "./AvatarComp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import dis4 from "./../imgs/dis4.png";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Members() {
  const [, curServId] = useContext(CurSerStateContext);
  const [, SignOut, currentUser] = useContext(AuthContext);

  const [members, setMembers] = useState([]);
  useEffect(() => (curServId ? getMembers() : null), [curServId]);

  const getMembers = async () => {
    const docRef = doc(db, "servers", `${curServId}`);
    const docSnap = await getDoc(docRef);
    let a = docSnap.data();

    const colRef = collection(db, "users");
    const q = query(colRef, where(documentId(), "in", a.members));
    const res = await getDocs(q);

    const mem = res.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    setMembers(mem);
  };

  return (
    <Box sx={{ bgcolor: "primary.light",height:1 }}>
    <AppBar elevation={1} position="static" sx={{ bgcolor: "white" }}>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // boxShadow: "none",
          }}
        >
          <Box sx={{ borderLeft: "2px solid grey", pl: 2,ml:'auto' }}>
            {currentUser ? (
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={SignOut}
              >
                SignOut
              <LogoutIcon fontSize="small" sx={{ml:1}} />
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <Typography
        variant="subtitle2"
        component="div"
        gutterBottom
        sx={{
          // bgcolor: "primary.light",
          display: "inline-flex",
          p:2
        }}
      >
        <ArrowRightIcon fontSize="small" /> Members
      </Typography>
      <Stack spacing={1} px={2}>
        {members.length ? (
          members.map((mem) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AvatarComp
                icon={dis4}
                // name={mem.userName}
                type={"circular"}
                sx={{ mr: 1 }}
              />
              <Typography align="center" variant="subtitle1">
                {mem.userName}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ width: "100%", mb: 2 }}
          >
            Loading...
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
