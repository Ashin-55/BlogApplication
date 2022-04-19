import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chatloading from "../../skeleton/Chatloading";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let rows;
export default function PreUsers() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoadin] = React.useState(true);

  const adminInfo = localStorage.getItem("adminInfo");
  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };
  const fetchAllUser = async () => {
    const { data } = await axios.get("/admin/allPreUser", config);
    setData(data);
    setLoadin(false);
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("All User List", 20, 10);
    doc.autoTable({
      columns: [
        { header: "Name", dataKey: "firstName" },
        { header: "Email", dataKey: "email" },
        { header: "Phone", dataKey: "phone" },
        { header: "Premium Enable", dataKey: "premiumUser" },
        { header: "Join Date", dataKey: "createdAt" },
      ],
      body: data  
    });
    doc.save("PremiumUserList.pdf");
  };

  React.useEffect(() => {
    !adminInfo && navigate("/admin/login");
    adminInfo && fetchAllUser();
  }, []);
  rows = data;
  return loading ? (
    <Container>
      <Chatloading />
    </Container>
  ) : (
    <Container style={{ minHeight: "35vw" }} id='report'>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom:"10px",
        }}
      >
        <Typography variant='h4'>Premium Users</Typography>
        <Button size="small" variant='contained' onClick={generatePDF}>
          Download Report
        </Button>
      </Box>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b> Name of user</b>
            </StyledTableCell>
            <StyledTableCell align='right'>
              <b> Email id</b>
            </StyledTableCell>
            <StyledTableCell align='right'>
              <b> Phone</b>
            </StyledTableCell>
            <StyledTableCell align='right'>
              <b> Join Date</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component='th' scope='row'>
                {row.firstName} {row.laststName}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.email}</StyledTableCell>
              <StyledTableCell align='right'>{row.phone}</StyledTableCell>

              <StyledTableCell align='right'>
                {moment(row.createdAt).format("ll")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
