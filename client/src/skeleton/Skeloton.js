import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Skeloton = ({fav}) => {
  return (
    <>
      <Stack spacing={0.5} sx={{ padding: "4% 10%" }}>
        {fav ? null : (
          <Skeleton
            variant='circular'
            width={50}
            height={50}
            sx={{ marginBottom: "3%" }}
          />
        )}
        <Skeleton variant='rectangular' width='100%' height={200} />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
      </Stack>{" "}
    </>
  );
};

export default Skeloton;
