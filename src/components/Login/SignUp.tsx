import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../service/api";
import { IUser } from "../../lib/interface";
import "./SignUp.css";
import { setLocalStorage } from "../../lib/utils/local-storage";
export default function SignUp() {
  const theme = createTheme();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required").max(32),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      const res = await signin(values as IUser);
      
      if (res) {
        setLocalStorage("user-data", JSON.stringify(res));
        navigate("/");
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 4 }}>
            <LockIcon />
          </Avatar>
          <Typography sx={{ marginBottom: 4 }} component="h1" variant="h5">
            Đăng ký
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name"
                  id="firstName"
                  variant="outlined"
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  fullWidth
                  required
                />
                <div className="err">
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                  ) : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  id="lastName"
                  variant="outlined"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  fullWidth
                  required
                />
                <div className="err">
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Username"
                  id="username"
                  variant="outlined"
                  type="text"
                  {...formik.getFieldProps("username")}
                  fullWidth
                  required
                />
                <div className="err">
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  id="email"
                  variant="outlined"
                  type="email"
                  {...formik.getFieldProps("email")}
                  fullWidth
                  required
                />
                <div className="err">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  id="password"
                  variant="outlined"
                  type="current-password"
                  {...formik.getFieldProps("password")}
                  fullWidth
                  required
                />
                <div className="err">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <Box className="submit" sx={{ mt: 3, alignItems: "center" }}>
                  <Button type="submit" variant="contained">
                    Đăng ký
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Link to="/login">Bạn đã có tài khoản? Đăng nhập</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
