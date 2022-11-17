import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../lib/interface";
import { removeLocalStorage } from "../../lib/utils/local-storage";
import "./Header.css";

interface Props {
  user: IUser;
}

export const Header = (props: Props): JSX.Element => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeLocalStorage("user-data");
    removeLocalStorage("access-token");
    navigate("/login");
  };
  if (!props.user.username) {
    return (
      <div className="header">
        <div className="title">Xin chào,</div>
        <ButtonGroup variant="outlined">
          <Button>
            <Link to="/register">Đăng ký</Link>
          </Button>
          <Button>
            <Link to="/login">Đăng nhập</Link>
          </Button>
        </ButtonGroup>
      </div>
    );
  }
  return (
    <div className="header">
      <div className="title">
        Xin chào, {props.user.firstName} {props.user.lastName}
      </div>
      <ButtonGroup variant="outlined">
        <Button onClick={handleLogout}>Đăng xuất</Button>
      </ButtonGroup>
    </div>
  );
};
