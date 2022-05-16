import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, Stack } from "@mui/material";
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
import AvatarComp from "./AvatarComp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function Members() {
  const [, curServId] = useContext(CurSerStateContext);

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
    <Box sx={{ bgcolor: "primary.light" }} p={2} height={0.95}>
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
        <ArrowRightIcon fontSize="small" /> Members
      </Typography>
      <Stack spacing={0}>
        {members.length ? (
          members.map((mem) => (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AvatarComp
                name={mem.userName}
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
            gutterBottom="true"
            sx={{ width: "100%", mb: 2 }}
          >
            Loading...
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
