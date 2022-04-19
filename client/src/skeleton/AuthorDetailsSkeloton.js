import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";


const AuthorDetailsSkeloton = () => {
  return (
    <>
      <Stack spacing={0.5} sx={{ padding: "4% 10%" }}>
        <Skeleton variant='circular' width='100%' height={400} />
        <Skeleton variant='text' width='70%' />
        <Skeleton variant='text' width='40%' />

        <Skeleton variant='text' width='60%'  />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
      </Stack>{" "}
    </>
  );
};

export default AuthorDetailsSkeloton;
