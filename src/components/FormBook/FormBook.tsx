import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IBook } from "../../lib/interface";
import "./FormBook.css";
import {
  addBook,
  editBook,
  getListBook,
  getSingleBook,
} from "../../service/api";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
const initalState: IBook = {
  bookcode: 0,
  title: "",
  author: "",
  description: "",
  catagory: -1,
  image: "",
  date: "",
  numberPage: 0,
};

export const FormBook = () => {
  const [state, setState] = useState(initalState);
  const { title, author, description, date, catagory, image, numberPage } =
    state;

  const { id } = useParams();
  const getBook = async (bookcode: number) => {
    const response = await getSingleBook(bookcode);
    setState(response);
  };

  useEffect(() => {
    if (id) {
      const idInt = parseInt(id);
      getBook(idInt);
    }
  }, [id]);
  let navigate = useNavigate();

  const updateBook = async (data: IBook, id: number) => {
    const response = await editBook(id, data);
    if (response) {
      toast.success("Update successfully!");
      return navigate("/");
    }
  };

  const add = async (data: IBook) => {
    const response = await addBook(data);
    if (response) {
      toast.success("Add success!");
      return navigate("/");
    } else {
      toast.warn("Ten nay da ton tai");
    }
  };
  const handleSubit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !author || !date) toast.error("Vui long dien vao!");
    else {
      if (!id) {
        add(state);
      } else {
        const idInt = parseInt(id);
        updateBook(state, idInt);
        getListBook();
      }
    }
  };

  const handleInput = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleChange = (e: { target: { name: any; value: any } }) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // const [catagogy, setCatagogy] = React.useState(catagogy);
  // const handleChange = (event: { target: { value: any } }) => {
  //   setCatagogy(event.target.value);
  // };
  return (
    <div style={{ marginTop: "50px" }}>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          textAlign: "center",
        }}
      >
        {id ? "Chỉnh sửa sách" : "Thêm sách mới"}
      </Typography>
      <form
        style={{
          marginTop: "auto",
          padding: "15px",
          maxWidth: "800px",
          alignContent: "center",
        }}
        onSubmit={handleSubit}
        id="form"
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleInput}
              value={title}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="author">Tác giả</label>
            <input
              type="text"
              id="author"
              name="author"
              onChange={handleInput}
              value={author}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="description">Mô tả về sách</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleInput}
              value={description}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="date">Ngày phát hành</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleInput}
              value={date}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="numberPage">Số trang</label>
            <input
              type="text"
              id="numberPage"
              name="numberPage"
              onChange={handleInput}
              value={numberPage}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="catagory">Thể loại</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="catagory"
                name="catagory"
                value={catagory}
                label="Cataloge"
                onChange={handleChange}
              >
                <MenuItem value={0}>History</MenuItem>
                <MenuItem value={1}>Textbook</MenuItem>
                <MenuItem value={2}>Novel</MenuItem>
                <MenuItem value={3}>Comic</MenuItem>
                <MenuItem value={4}>Poem</MenuItem>
                <MenuItem value={5}>Self-help</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <input type="submit" value={"Lưu"} />
      </form>
    </div>
  );
};
