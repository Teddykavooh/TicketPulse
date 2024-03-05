import "./index.scss";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa";
// import * as jwt from "jsonwebtoken";

const Login = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const reDirect = async () => {
    try {
      const meToken = localStorage.getItem("token");
      // console.log("Redirect token: ", meToken);

      // Make a POST request to the backend route to decode the token
      const response = await Axios.post(
        `${process.env.REACT_APP_HOST}/api/decodeToken/decode`,
        {
          token: meToken,
        },
        // meToken,
      );

      const tokenData = response.data;
      // console.log("Token Data: ", tokenData);

      if (tokenData.role === 1) {
        // Redirect to the admin page
        navigator("/admin");
      } else {
        // Redirect to the events page
        navigator("/events");
      }
    } catch (error) {
      // console.error("Error decoding token:", error.message);
      alert("Error decoding token");
      navigator("/");
    }
  };

  const handleLogin = async () => {
    // console.log("Email, Pass:", email, password);
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_HOST}/api/auth/login`,
        {
          email: email,
          password: password,
        },
      );

      // Handle the response from the server
      if (response.data.token) {
        // Successfully logged in
        // console.log("User logged in successfully");
        alert("User logged in successfully");

        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);
        // console.log("Token", localStorage.getItem("token"));
        reDirect();
        // navigator("/admin");
      } else {
        // Login failed
        // console.error("Login failed:", response.data.error);
        alert("Login failed, check credentions");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      // Handle other errors, such as network issues
    }
  };

  return (
    <div className="loginCont">
      <div className="screen-1">
        {/* <svg
          className="logo"
          xmlns="http://www.w3.org/2000/svg"
          //   xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="300"
          height="300"
          viewBox="0 0 640 480"
          xmlSpace="preserve"
        >
          <g transform="matrix(3.31 0 0 3.31 320.4 240.4)">
            <circle
              style="stroke: rgb(0, 0, 0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(61, 71, 133); fill-rule: nonzero; opacity: 1"
              cx="0"
              cy="0"
              r="40"
            ></circle>
          </g>
          <g transform="matrix(0.98 0 0 0.98 268.7 213.7)">
            <circle
              style="stroke: rgb(0, 0, 0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
              cx="0"
              cy="0"
              r="40"
            ></circle>
          </g>
          <g transform="matrix(1.01 0 0 1.01 362.9 210.9)">
            <circle
              style="stroke: rgb(0, 0, 0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
              cx="0"
              cy="0"
              r="40"
            ></circle>
          </g>
          <g transform="matrix(0.92 0 0 0.92 318.5 286.5)">
            <circle
              style="stroke: rgb(0, 0, 0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
              cx="0"
              cy="0"
              r="40"
            ></circle>
          </g>
          <g transform="matrix(0.16 -0.12 0.49 0.66 290.57 243.57)">
            <polygon
              style="stroke: rgb(0, 0, 0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
              points="-50,-50 -50,50 50,50 50,-50 "
            ></polygon>
          </g>
          <g transform="matrix(0.16 0.1 -0.44 0.69 342.03 248.34)">
            <polygon
              style="stroke: rgb(0, 0, 0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1"
              vectorEffect="non-scaling-stroke"
              points="-50,-50 -50,50 50,50 50,-50 "
            ></polygon>
          </g>
        </svg> */}
        <FaRegUser className="logo" />
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            {/* <ion-icon name="mail-outline"></ion-icon> */}
            <FaEnvelope />
            <input
              type="email"
              placeholder="username@sth.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="sec-2">
            {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
            <FaLock />
            <input
              className="pas"
              type={showPassword ? "text" : "password"}
              placeholder="************"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {/* <ion-icon class="show-hide" name="eye-outline"></ion-icon> */}
            <FaEye
              className="show-hide"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button
          className="login"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
        <div className="footerL">
          <span>Sign up</span>
          <span>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
