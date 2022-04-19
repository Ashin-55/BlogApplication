import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Chatloading() {
  return (
    <Box  sx={{ marginX: "5%" }}>
      <Skeleton variant='text' height={80} />
      <Skeleton variant='text' height={80} />
      <Skeleton variant='text' height={80} />
      <Skeleton variant='text' height={80} />
      <Skeleton variant='text' height={80} />
      <Skeleton variant='text' height={80} />
    </Box>
  );
}
