import { Box, Typography } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#38B2Ac",
          color: "white",
        },
        background: "#E8E8E8",
        width: "80%",
        display: "flex",
        alignItems: "center",
        borderRadius: 4,
        sizes:"small"
      }}
      paddingX={2}
      paddingY={1}
      marginX={2}
      marginY={1}
    >
      <Avatar
        sizes='small'
        sx={{ cursor: "pointer" }}
        name={user.firstName}
        src='../../images/profile3.png'
      />
      <Box sx={{}}>
        <Typography>{user.firstName}</Typography>
        <Typography fontSize='xs'>
          <b>Email: </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
