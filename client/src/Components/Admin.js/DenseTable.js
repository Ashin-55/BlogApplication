import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

let rows;
export default function DenseTable({ data }) {
    console.log(data)
  rows = data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Name of user</TableCell>
            <TableCell align='right'>Email id</TableCell>
            <TableCell align='right'>Phone</TableCell>
            <TableCell align='right'>Premium User</TableCell>
            <TableCell align='right'>Join Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.firstName} {row.laststName}
              </TableCell>
              <TableCell align='right'>{row.email}</TableCell>
              <TableCell align='right'>{row.phone}</TableCell>
              <TableCell align='right'>{row.premiumUser}</TableCell>
              <TableCell align='right'>
                {moment(row.createdAt).format("ll")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
