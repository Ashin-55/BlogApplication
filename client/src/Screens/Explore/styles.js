import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  centerContent: {
    // display: "flex",
    // justifyContent: "center",
  },
  mainHeading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  locationIcon:{
    '&:hover': {
        color: "#3193f5"
      },
      cursor:"pointer"
  }
}));
