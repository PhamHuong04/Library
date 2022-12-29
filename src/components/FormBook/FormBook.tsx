import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import { IBook, IImgageBook } from "../../lib/interface";
import "./FormBook.css";
import { editBook, getListBook, getSingleBook } from "../../service/api";
import FileUpload from "../FileUpload/FileUpload";
import API from "../../lib/axios/axios";
const initalState: IBook = {
  bookcode: 0,
  title: "",
  author: "",
  description: "",
  catagory: -1,
  date: "",
  numberPage: 0,
  price: 0,
};

export const FormBook = () => {
  const [state, setState] = useState(initalState);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imageId, setImageId] = React.useState<string>("");
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const { title, author, description, date, catagory, numberPage, price } = state;

  const { id } = useParams();
  const getBook = async (bookcode: number) => {
    const {
      data: { author, catagory, description, numberPage, date, title, image, price },
    }: { data: IBook } = await API.get(`book/${id}`);
    setState({
      author,
      catagory,
      description,
      numberPage,
      date,
      title,
      image,
      bookcode,
      price,
    });
    if (image) {
      setImageUrl(image.path);
      setImageId(image.id);
    }
  };

  useEffect(() => {
    if (id) {
      const idInt = parseInt(id);
      getBook(idInt);
    } else {
      setDisabled(false);
    }
  }, [id]);
  let navigate = useNavigate();

  const handleAddImage = async (image: File) => {
    const formdata = new FormData();
    formdata.append("file", image);
    try {
      const { data } = await API.post(`book/image`, formdata);

      return data as IImgageBook;
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 413) {
        toast.error(error.response.data.message);
      }
    }
  };
  const addNewItem = async (data: Omit<IBook, "id" | "image">) => {
    try {
      let imageBook;
      if (imgFile !== null) {
        imageBook = await handleAddImage(imgFile);
        if (imageBook) {
          const response = await API.post("book", {
            ...data,
            imageId: imageBook.id,
          });

          if (response.status === 201) {
            toast.success("Thêm sách thành công!");
            navigate("/");
          }
        }
      } else {
        const response = await API.post("book", data);
        if (response.status === 201) {
          toast.success("Thêm sách thành công !");
          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleUpdateBookWithImage = async (bookId: string, image: File) => {
    const formdata = new FormData();
    formdata.append("file", image);

    try {
      const { data } = await API.post(`book/image/${bookId}`, formdata);
      return data as IBook;
    } catch (error: any) {
      if (error.response.status === 413) {
        toast.error(error.response.data.message);
      }
    }
  };
  const updateItem = async (data: Omit<IBook, "id" | "image">) => {
    try {
      if (id) {
        if (imgFile === null) {
          const response = await API.patch(`book/${id}`, data);

          if (!imageUrl && imageId) {
            await API.delete(`book/image/${imageId}`);
          }

          if (response.status === 200) {
            toast.success("Chỉnh sửa thành công !");
            navigate("/");
          }
        } else {
          const book = await handleUpdateBookWithImage(id as string, imgFile);
          if (book) {
            toast.success("Chỉnh sửa thành công !");
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title || !author || !date)
      toast.error("Vui lòng điền vào các trường có đánh dấu *");
    else {
      if (id) {
        if (!disabled) {
          return;
        }
        updateItem(state);
        getListBook();
      } else {
        addNewItem(state);
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

  const getImageFile = (file: File | null) => {
    setImgFile(file);
    if (file === null) {
      setImageUrl("");
    }
  };

  const handleChangeAction = useCallback(() => {
    if (id) {
      if (disabled) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [id, disabled]);

  return (
    <div style={{ marginTop: "50px" }}>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          textAlign: "center",
          color: "green",
        }}
      >
        {id ? "Book" : "Add new book"}
      </Typography>
      <form
        style={{
          marginTop: "auto",
          padding: "15px",
          maxWidth: "1500px",
        }}
        onSubmit={handleSubit}
        id="form"
      >
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <div className="title-row">
              <Grid item xs={5}>
                <label htmlFor="title" className="title-form">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleInput}
                  value={title}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={5}>
                <label htmlFor="author" className="title-form">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  onChange={handleInput}
                  value={author}
                  disabled={disabled}
                />
              </Grid>
            </div>
            <Grid item xs={12}>
              <label htmlFor="description" className="title-form title-row">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={handleInput}
                value={description}
                disabled={disabled}
              />
            </Grid>
            <div className="title-row">
              <Grid item xs={5}>
                <label htmlFor="date" className="date title-form">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  onChange={handleInput}
                  value={date}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={5}>
                <label htmlFor="numberPage" className="title-form">
                  Page Number
                </label>
                <input
                  type="text"
                  id="numberPage"
                  name="numberPage"
                  onChange={handleInput}
                  value={numberPage}
                  disabled={disabled}
                />
              </Grid>
            </div>
            <div className="title-row">
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel id="catagory">Thể loại</InputLabel>
                  <Select
                    labelId="catagory"
                    id="catagory"
                    name="catagory"
                    value={catagory}
                    label="Cataloge"
                    onChange={handleChange}
                    disabled={disabled}
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
              <Grid item xs={5}>
                <label htmlFor="price" className="price">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={handleInput}
                  value={price}
                  disabled={disabled}
                />
              </Grid>
            </div>
          </Grid>
          <Grid item xs={6} justifyContent="center" paddingLeft={2}>
            <Typography
              component="h1"
              variant="h5"
              marginBottom={2}
              color="GrayText"
            >
              Upload Image
            </Typography>

            <FileUpload
              url={imageUrl}
              getImageItem={getImageFile}
              disabled={disabled}
            />
          </Grid>
        </Grid>

        <CssBaseline />
        <Button
          variant="outlined"
          type="submit"
          sx={{ marginTop: "100px", width: "700px", fontWeight: "bold" }}
          onClick={handleChangeAction}
        >
          {id ? (disabled ? "Edit" : "Save") : "Add Book"}
        </Button>
      </form>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
