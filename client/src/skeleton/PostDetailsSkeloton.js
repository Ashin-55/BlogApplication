import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";

const PostDetailsSkeloton = () => {
  return (
    <>
      <Stack spacing={0.5} sx={{ padding: "4% 10%" }}>
        <Skeleton variant='text' width='70%' />
        <Skeleton variant='text' width='40%' />
        <Skeleton variant='text' width='40%' />
        <Skeleton variant='rectangular' width='100%' height={300} />
        <Skeleton variant='text' width='60%' />
        <Skeleton variant='text' width='60%' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
      </Stack>
    </>
  );
};

export default PostDetailsSkeloton;
