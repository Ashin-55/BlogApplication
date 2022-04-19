import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { red } from "@mui/material/colors";

const useStyles = makeStyles({
  footer: {
    width: "100%",
    justifyContent: "Center",
  },
});
const FooterComp = () => {
  const classes = useStyles();
  return (
    <>
      <Box sx={{ backgroundColor: "#bdbdbd" }}>
        <Typography align='center' sx={{ padding: "3%" }}>
          Copyright © 1998-2022 Be on the ROAD Travel Group, All Rights
          Reserved.
        </Typography>
      </Box>
    </>
  );
};

export default FooterComp;
