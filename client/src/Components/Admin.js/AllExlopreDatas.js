import {
  Button,
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  styled,
  Grid,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Chatloading from "../../skeleton/Chatloading";

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
const AllExlopreDatas = () => {
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
  const fetchExploreData = async () => {
    const { data } = await axios.get("/admin/exploreData", config);
    console.log(data);
    setData(data);
    setLoading(false);
  };
  const addDataHandler = () => {
    navigate("/admin/addExplore");
  };
  const deleteHandler = async (id) => {
    confirmAlert({
      title: "CONFIRM",
      message: "Are you sure to delete this post",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`/admin/deleteExploreData/${id}`, config)
              .then((response) => {
                toast(`post deleted successfllly`, {
                  type: "success",
                  autoClose: 1000,
                });
                setRefresh(!refresh);
              })
              .catch((error) => {
                toast(`failed to delete`, { type: "error", autoClose: 1000 });
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast("saved", {
              type: "success",
              autoClose: 1000,
            });
          },
        },
      ],
    });
  };
  useEffect(() => {
    if (adminInfo) {
      fetchExploreData();
    } else {
      navigate("/admin/login");
    }
  }, [refresh]);
  rows = data;
  return loading ? (
    <Container>
      <Chatloading />
    </Container>
  ) : (
    <Container sx={{ minHeight: "80vh" }}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h3'>Explore Data</Typography>
        <Typography
          display='flex'
          flexDirection='column'
          justifyContent='center'
        >
          <Grid>
            <Button variant='outlined' onClick={addDataHandler}>
              Add Data
            </Button>
          </Grid>
        </Typography>
      </Grid>
      <Table size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>
              <b> Name of Destination</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Image</b>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <b> Date</b>
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
              <StyledTableCell component='th' scope='row' align='center'>
                {row.destinationName}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <img src={row.destinationImg} alt='logo' height={30} />
              </StyledTableCell>
              {console.log(row.destinationImg)}
              <StyledTableCell align='center'>
                {moment(row.createdAt).format("ll")}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Button
                  onClick={() => {
                    deleteHandler(row._id);
                  }}
                  size='small'
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#e31f09",
                    boxSizing: "content-box",
                  }}
                  variant='contained'
                >
                  {" "}
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AllExlopreDatas;
