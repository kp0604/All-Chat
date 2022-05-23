import React from "react";
import { Avatar } from "@mui/material";
import dis2 from "./../imgs/dis2.png";

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

    let strArr = name.split(" ");

    let str = "";

    for (let i = 0; i < strArr.length; i++) {
      str += strArr[i][0];
    }

    return {
      sx: sx,
      children: str,
    };
  }

  return (
    <>
      {props.src ? (
        <Avatar
          sx={props.sx}
          variant={props.type}
          disableUnderline="true"
          src={props.src}
        />
      ) : props.icon && props.name ? (
        <Avatar
          src={props.icon}
          sx={{
            ...props.sx,
            bgcolor: `${stringToColor(props.name.toUpperCase())}`,
          }}
          variant={props.type}
          disableUnderline="true"
        />
      ) : props.icon ? (
        <Avatar
          src={props.icon}
          sx={props.sx}
          variant={props.type}
          disableUnderline="true"
        />
      ) : props.name ? (
        <Avatar
          {...stringAvatar(props.name.toUpperCase())}
          variant={props.type}
          disableUnderline="true"
        />
      ) : (
        <Avatar
          src={dis2}
          variant={props.type}
          sx={props.sx}
          disableUnderline="true"
        />
      )}
    </>
  );
}
