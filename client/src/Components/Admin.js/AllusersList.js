import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Button, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import axios from "axios";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chatloading from "../../skeleton/Chatloading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
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
export default function AllusersList() {
  toast.configure();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(true);

  const adminInfo = localStorage.getItem("adminInfo");
  const config = {
    headers: {
      Authorization: `Bearer ${adminInfo}`,
    },
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
    doc.save("UserList.pdf");
  };

  const userBlockHandler = (userid) => {
    axios
      .get(`/admin/blockUser/${userid}`, config)
      .then((response) => {
        toast(response.data.message, { type: "success", autoClose: 2000 });
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        toast("failed to Block User,Try again ", {
          type: "error",
          autoClose: 2000,
        });
      });
  };
  const userUnblockHandler = async (userid) => {
    axios
      .get(`/admin/unblockUser/${userid}`, config)
      .then((res) => {
        setRefresh(!refresh);
        toast(res.data.message, { type: "success", autoClose: 2000 });
      })
      .catch((err) => {
        console.log(err);
        toast("failed to unBlock User,Try again ", {
          type: "error",
          autoClose: 2000,
        });
      });
  };
  const fetchAllUser = async () => {
    const { data } = await axios.get("/admin/allUser", config);
    setData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    !adminInfo && navigate("/admin/login");
    adminInfo && fetchAllUser();
  }, [refresh]);

  rows = data;
  return loading ? (
    <Container>
      <Chatloading />
    </Container>
  ) : (
    <Container style={{ minHeight: "35vw" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom:"10px",
        
        }}
      >
        <Typography variant='h4'>All users</Typography>
        <Button size="small" variant='contained' onClick={generatePDF}>
          Download Report
        </Button>
      </Box>
      <Table size='medium' aria-label='a dense table' id='report'>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b> Name of user</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Email id</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Phone</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Premium User</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Join Date</b>
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
                {row.firstName} {row.laststName}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.email}</StyledTableCell>
              <StyledTableCell align='center'>{row.phone}</StyledTableCell>
              <StyledTableCell align='center'>
                {row.premiumUser ? "Enable" : "NotEnable"}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {moment(row.createdAt).format("ll")}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {row.status ? (
                  <Button
                    onClick={() => {
                      userBlockHandler(row._id);
                    }}
                    size='small'
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#e31f09",
                      minWidth: "52%",
                      boxSizing: "content-box",
                    }}
                    variant='contained'
                  >
                    Block
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      userUnblockHandler(row._id);
                    }}
                    size='small'
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#53ed28",
                      minWidth: "52%",
                      boxSizing: "content-box",
                    }}
                    variant='contained'
                  >
                    Unblock
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
