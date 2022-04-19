import { makeStyles } from "@material-ui/styles";
export const  useStyle = makeStyles((theme) => ({
    mainRoot: {
      marginBottom:"5%",
      marginTop: "1%",
      padding: "1% 10% 10% 10%",
      boxShadow: "-9px 14px 47px -2px rgba(84,80,84,0.77)",
      borderRadius: 20,
      border: 4,
    },
    logo: {
      display: "flex",
      justifyContent: "center",
    },
    logoText: {
      fontFamily: "Poppins",
      fontWeight: 600,
      display: "flex",
      justifyContent: "center",
    },
    logoSubText: {
      fontFamily: "Poppins",
      fontWeight: 600,
      fontSize: 39,
      display: "flex",
      justifyContent: "center",
    },
  }));