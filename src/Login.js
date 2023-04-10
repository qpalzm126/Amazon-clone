import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "./user";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userdata);
  const [email, setEmail] = useState("");
  const [passward, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, passward)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
    // dispatch(SET_USER());
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, passward)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_logocontainer">
        <Link to="/">
          <img
            className="login_logo"
            src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png"
            alt=""
          />
        </Link>
      </div>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form className="form">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={passward}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="login_signinButton" type="submit" onClick={signIn}>
            Sign In
          </Button>
        </form>
        <Button className="login_registerButton" onClick={register}>
          Create your Rmazon account
        </Button>
      </div>
    </div>
  );
}

export default Login;
