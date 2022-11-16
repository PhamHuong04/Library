// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockIcon from "@mui/icons-material/Lock";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { signin } from "../../service/api";
// import { IUser } from "../../lib/interface";

// const theme = createTheme();
// const loginFormSchema = Yup.object({
//   name: Yup.string().required(),
//   username: Yup.string().required().max(255),
//   email: Yup.string().required(),
//   password: Yup.string().required().max(32),
// });
// export default function SignUp() {
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: loginFormSchema,
//     onSubmit: async (values) => {
//       console.log("test huihihihijdisjdi");

//       await signin(values as IUser);
//       console.log(values);

//       navigate("/login");
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main", marginTop: 4 }}>
//             <LockIcon />
//           </Avatar>
//           <Typography sx = {{marginBottom: 4}} component="h1" variant="h5">
//             Đăng ký
//           </Typography>
//           <form
//             className="form"
//             onSubmit={formik.handleSubmit}
//             onReset={formik.handleReset}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="name"
//                   required
//                   fullWidth
//                   id="name"
//                   label="Name"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="username"
//                   label="Username"
//                   name="username"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="new-password"
//                   label="Reset Password"
//                   type="password"
//                   id="new-password"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Đăng ký
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link to="/login">Bạn đã có tài khoản? Đăng nhập</Link>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function SignUp() {
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       username: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string()
//         .max(15, "Must be 15 characters or less")
//         .required("Required"),
//       lastName: Yup.string()
//         .max(20, "Must be 20 characters or less")
//         .required("Required"),
//       username: Yup.string().required("Required").max(255),
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string().required("Required").max(32),
//     }),
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="firstName">First Name</label>
//       <input
//         id="firstName"
//         name="firstName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.firstName}
//       />
//       {formik.touched.firstName && formik.errors.firstName ? (
//         <div>{formik.errors.firstName}</div>
//       ) : null}

//       <label htmlFor="lastName">Last Name</label>
//       <input
//         id="lastName"
//         name="lastName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.lastName}
//       />
//       {formik.touched.lastName && formik.errors.lastName ? (
//         <div>{formik.errors.lastName}</div>
//       ) : null}

//       <label htmlFor="lastName">Username</label>
//       <input
//         id="username"
//         name="username"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.username}
//       />
//       {formik.touched.username && formik.errors.username ? (
//         <div>{formik.errors.username}</div>
//       ) : null}

//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email ? (
//         <div>{formik.errors.email}</div>
//       ) : null}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { signin } from "../../service/api";
import { IUser } from "../../lib/interface";
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
    onSubmit:async (values) => {
      const res = await signin(values as IUser);
      if (res) {
        navigate('/');
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
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="current-password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}

            <button type="submit">Submit</button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
