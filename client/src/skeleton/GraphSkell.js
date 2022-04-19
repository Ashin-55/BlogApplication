import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function GraphSkell() {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        padding: "10%",
      }}
    >
      <CircularProgress  size="8rem"/>
    </Box>
  );
}
