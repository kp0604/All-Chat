import React from "react";
import { Avatar } from "@mui/material";

export default function AvatarComp(props) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    let sx = props.sx ? props.sx : {};
    sx.bgcolor = stringToColor(name);
    return {
      sx: sx,
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  
  return (
    <>
    {props.src?
    <Avatar
    sx={props.sx}
      variant={props.type}
      disableUnderline="true"
      src={props.src}
    />:
    <Avatar
    {...stringAvatar(props.name.toUpperCase())}
      variant={props.type}
      disableUnderline="true"
    />
  }
  </>
  );
}
