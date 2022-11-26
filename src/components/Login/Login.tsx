import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { login } from "../../service/api";
import { Container, CssBaseline, Grid } from "@mui/material";
import { setLocalStorage } from "../../lib/utils/local-storage";

const theme = createTheme();

const loginFormSchema = Yup.object({
  email: Yup.string().required().max(255),
  password: Yup.string().required().max(32),
});

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      const res = await login(values.email, values.password);

      if (res) {
        setLocalStorage("user-data", JSON.stringify(res.user));
        setLocalStorage("access-token", JSON.stringify(res.accessToken));
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
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form
            className="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="standard"
                    className="inputInfor"
                    onChange={formik.handleChange}
                    fullWidth
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    name="password"
                    type="password"
                    label="Password"
                    variant="standard"
                    className="inputInfor"
                    onChange={formik.handleChange}
                    fullWidth
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="submit" sx={{ mt: 3, alignItems: "center" }}>
                  <Button type="submit" variant="contained">
                    Đăng nhập
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Link to="/register">Bạn chưa có tài khoản? Đăng ký</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
