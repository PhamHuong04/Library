import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBook, getListBook } from "../../service/api";
import { IBook } from "../../lib/interface";
export function Home() {
  const [data, setData] = useState<IBook[]>([]);
  const getBook = async () => {
    const books = await getListBook();
    setData(books);
  };
  useEffect(() => {
    getBook();
  }, []);
  const convertCataloge = (catagory: number) => {
    if (catagory === 0) return "History";
    else if (catagory === 1) return "Textbook";
    else if (catagory === 2) return "Novel";
    else if (catagory === 3) return "Comic";
    else if (catagory === 4) return "Poem";
    else if (catagory === 5) return "Self help";
  }

  const onDeleteBook = (book: IBook) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete Book: '${book.title}'?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(book.bookcode);
      }
    });
  };
  return (
    <Box p="20px">
      <Typography component="h1" variant="h4" textAlign="center" pb="20px">
        Sách
      </Typography>

      <Link to="/add">
        <Button variant="contained">Thêm sách mới</Button>
      </Link>

      <TableContainer component={Paper} sx={{ mt: "40px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="200px">STT</TableCell>
              <TableCell align="center">Tên sách</TableCell>
              <TableCell align="center">Tác giả</TableCell>
              <TableCell align="center">Ngày phát hành</TableCell>
              <TableCell align="center">Thể loại</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((book, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{book.title}</TableCell>
                  <TableCell align="center">{book.author}</TableCell>
                  <TableCell align="center">{book.date}</TableCell>
                  <TableCell align="center">
                    {convertCataloge(book.catagory)}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" gap="6px" justifyContent="center">
                      <Link to={`/update/${book.bookcode}`}>
                        <Button variant="contained" color="success">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => onDeleteBook(book)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
