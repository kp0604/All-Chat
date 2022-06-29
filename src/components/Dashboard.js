import React, { useContext } from "react";
import Chats from "./Chats.js";
import Members from "./Members.js";
import Navs from "./Navs";
import Serverrooms from "./Serverrooms.js";
import { Grid } from "@mui/material";
import { CurrentServerState } from "../states/CurrentServerState";
import { CurrentChannelState } from "../states/CurrentChannelState";
import { useParams } from "react-router-dom";

function Dashboard() {
  const params = useParams();

  return (
    <CurrentServerState>
      <CurrentChannelState>
        <Grid container spacing={0} sx={{ height: "100vh" }}>
          <Grid item xs={0} md={0.7} lg={0.7} sx={{display:{xs:'none',md:'block'}}}>
            <Serverrooms />
          </Grid>
          <Grid item xs={0} md={2.3}  sx={{display:{xs:'none',md:'block'}}}>
            <Navs />
          </Grid>
          <Grid item xs={12} md={params.serverId ? 7 : 9}>
            <Chats />
          </Grid>
          <Grid
            item
            xs={0}
            md={2}
            sx={{ display: {xs:'none',md:params.serverId ? "block" : "none"} }}
          >
            <Members />
          </Grid>
        </Grid>
      </CurrentChannelState>
    </CurrentServerState>
  );
}

export default Dashboard;
