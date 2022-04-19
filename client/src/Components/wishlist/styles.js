import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    title: {
      fontSize: 40,
      fontFamily: "Poppins",
    },
    subtitle: {
      fontSize: 20,
      fontFamily: "Poppins",
    },
    images: {
      padding: "10 10",
      borderRadius: 20,
    },
    posts: {
      padding: 10,
      margin: 25,
      
    },
    rightAlignItem: {
      marginLeft: "auto",
    },
    outerGrid: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });