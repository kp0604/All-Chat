import React, { useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AuthContext } from "../states/AuthState";
import { db } from "../firebase_config";

import { updateDoc, doc } from "firebase/firestore";
import AvatarComp from "./AvatarComp";

export default function ServersinEx({ server, idx }) {
  const [follow, setFollow] = useState("Follow");
  const [dis, setDis] = useState(false);

  const [, , , currentUserDb, getUserDb] = useContext(AuthContext);

  const handleFollow = async () => {
    let serversToFollow =
      currentUserDb && currentUserDb.serversFollowed
        ? currentUserDb.serversFollowed
        : [];
    let members = server && server.members ? server.members : [];
    serversToFollow.push(server.id);
    members.push(currentUserDb.id);
    const docRef = doc(db, "users", `${currentUserDb.id}`);
    await updateDoc(docRef, { serversFollowed: serversToFollow });
    const docRef1 = doc(db, "servers", `${server.id}`);
    await updateDoc(docRef1, { members: members });
    await getUserDb();
    setFollow("Followed");
    setDis(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        border: "1px solid gray",
        p: 2,
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AvatarComp name={server.serverName} type={"circular"} sx={{ mr: 2 }} />
        <Typography variant="subtitle1" component="div">
          {server.serverName.toUpperCase()}
        </Typography>
      </Box>
      <Button
        color="info"
        variant="contained"
        onClick={() => handleFollow()}
        disabled={dis}
      >
        {follow}
      </Button>
    </Box>
  );
}
