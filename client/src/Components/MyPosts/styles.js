import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  title: {
    fontSize: 30,
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins",
  },
  images: {
    padding: "10 10 0 10",
    borderRadius: 20,
  },
  posts: {

    padding: 10,
    margin: 25,
    cursor:"pointer"
  },
  rightAlignItem: {
    marginLeft: "auto",
  },
  outerGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  superHead:{
      fontSize:40,
      fontFamily:"Poppins"
  },
 
  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }

});
