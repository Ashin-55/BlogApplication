import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import React from "react";

const useStyles = makeStyles((theme) => {
  root: {
    top: theme.spacing(9);
  }
});
export default function SuccesAlert( { notify, setNotify } ) {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
