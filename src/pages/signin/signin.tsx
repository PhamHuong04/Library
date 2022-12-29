import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux-hook";
import { loginUser, selectUserRegister } from "../../lib/store/user/user";


interface Props {
  children: JSX.Element;
}

const SignInPage: React.FC<Props> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const userRegister = useAppSelector(selectUserRegister);
  const userRegister = useAppSelector(selectUserRegister);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginIn = async () => {
    if (email && password) {
      try {
       await dispatch(loginUser({ email, password })).unwrap();
        // console.log(res.access);
        // if (res) {
        //   localStorage.setItem("accessToken", res.access);
        // }
        navigate("/shop");
      } catch (error) {
        // TODO: show error message
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (userRegister) {
      setEmail(userRegister.email);
    }
  }, [userRegister]);

  return (
    <>
      <section
        className="section-conten padding-y"
        style={{ minHeight: "84vh" }}
      >
        <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
          <div className="card-body">
            <h4 className="card-title mb-4">Sign in</h4>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button
                  type="button"
                  onClick={(e) => onLoginIn()}
                  className="btn btn-success btn-block"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <p className="text-center mt-4">
          Don't have account? <a href="#">Sign up</a>
        </p> */}
        <br />
        <br />
      </section>
      {children}
    </>
  );
};

export default SignInPage;
