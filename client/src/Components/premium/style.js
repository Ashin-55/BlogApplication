import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  title: {
    fontSize: 40,
    fontFamily: "Poppins",
  },
  subtitle: {
    fontFamily: "poppins",
    fontSize: 20,
  },
  outerGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    padding: "10 10",
    borderRadius: 20,
  },
  card: {
    padding: "10%",
  }
});
