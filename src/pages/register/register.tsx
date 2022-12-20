import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../hooks/redux-hook";
import { registerUser } from "../../store/user/user";
import { useNavigate } from "react-router-dom";
interface Props {
  children: JSX.Element;
}

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .min(10, "phone number at least 10 character")
    .required("phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  firstName: yup
    .string()
    .min(4, "first name at least 4 character")
    .required("first name is required"),
  lastName: yup
    .string()
    .min(4, "last name at least 4 character")
    .required("last name is required"),
  password: yup
    .string()
    .min(8, "pasword at least 8 character")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .min(8, "confirm password at least 8 character")
    .required("password is required"),
  email: yup.string().required("email is required"),
});

const RegisterPage: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = () => {
    if (values.confirmPassword !== values.password) {
      return;
    }
    const username = values.email.split("@")[0];
    try {
      dispatch(registerUser({ ...values, username })).unwrap();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: submitForm,
  });

  return (
    <>
      <section className="section-content padding-y">
        <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
          <article className="card-body">
            <header className="mb-4">
              <h4 className="card-title">Sign up</h4>
            </header>
            <form onSubmit={submitForm}>
              <div className="form-row">
                <div className="col form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.firstName && errors.firstName && "is-invalid"
                    }`}
                    placeholder="Enter your info"
                    name="firstName"
                    required
                    id="firstName"
                    value={values["firstName"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="col form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.lastName && errors.lastName && "is-invalid"
                    }`}
                    placeholder="Enter your info"
                    name="lastName"
                    value={values["lastName"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      touched.email && errors.email && "is-invalid"
                    }`}
                    placeholder="Enter your info"
                    name="email"
                    value={values["email"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {touched.email && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className={`form-control ${
                      touched.phoneNumber && errors.phoneNumber && "is-invalid"
                    }`}
                    placeholder="Enter your info"
                    name="phoneNumber"
                    value={values["phoneNumber"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Create password</label>
                  <input
                    className={`form-control ${
                      touched.password && errors.password && "is-invalid"
                    }`}
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    value={values["password"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label>Repeat password</label>
                  <input
                    className={`form-control ${
                      touched.confirmPassword &&
                      errors.confirmPassword &&
                      "is-invalid"
                    }`}
                    placeholder=" confirm password"
                    type="password"
                    name="confirmPassword"
                    value={values["confirmPassword"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  onClick={submitForm}
                  className="btn btn-primary btn-block"
                >
                  Register
                </button>
              </div>
            </form>
          </article>
        </div>
        {/* <p className="text-center mt-4">
        Have an account? <a href="">Log In</a>
      </p> */}
        <br />
        <br />
      </section>
      {children}
    </>
  );
};

export default RegisterPage;
