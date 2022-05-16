import React from "react";
import Chats from "./Chats.js";
import Navs from "./Navs";
import Serverrooms from "./Serverrooms.js";
import { Grid } from "@mui/material";
import { CurrentServerState } from "../states/CurrentServerState";
import { CurrentChannelState } from "../states/CurrentChannelState";

function Dashboard() {
  return (
    <CurrentServerState>
      <CurrentChannelState>
        <Grid container spacing={0} sx={{ height: "100vh" }}>
          <Grid item xs={0.7}>
            <Serverrooms />
          </Grid>
          <Grid item xs={2.3}>
            <Navs />
          </Grid>
          <Grid item xs={9} height={1}>
            <Chats />
          </Grid>
        </Grid>
      </CurrentChannelState>
    </CurrentServerState>
  );
}

export default Dashboard;
