import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import axios from "axios";
import { Container, Button, Box, Typography } from "@mui/material";
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
  const adminInfo = localStorage.getItem("adminInfo");
  const [data, setData] = React.useState([]);
  const [printData, setPrintData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
  };

  const fetchAllUser = async () => {
    const { data } = await axios.get("/admin/allAuthors", config);
    const result = await axios.get("/admin/allAuthorsPrintData", config);
    setData(data);
    setPrintData(result.data);
    setLoading(false);
  };

  const viewButtonHandler = (id) => {
    navigate(`/admin/authorPost/${id}`);
  };
  const generatePDF = () => {
    const doc = new jsPDF();  
    doc.text("All User List", 20, 10);
    doc.autoTable({
      columns: [
        { header: "First Name", dataKey: "firstName" },
        { header: "Last Name", dataKey: "lastName" },
        { header: "Email", dataKey: "email" },
        { header: "Phone", dataKey: "phone" },
      ],
      body: printData,
    });
    doc.save("AuthorList.pdf");
  };

  React.useEffect(() => {
    console.log(adminInfo);
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
          marginBottom: "10px",
        }}
      >
        <Typography variant='h4'>All Author </Typography>
        <Button size='small' variant='contained' onClick={generatePDF}>
          Download Report
        </Button>
      </Box>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b> Name of Authorr</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Email id</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Phone</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Total Post</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Action</b>
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
                {row.authorData.firstName} {row.authorData.lastName}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.authorData.email}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.authorData.phone}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.count}</StyledTableCell>
              <StyledTableCell align='center'>
                <Button
                  onClick={() => {
                    viewButtonHandler(row.authorData._id);
                  }}
                >
                  View
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
