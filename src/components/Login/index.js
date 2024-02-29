import "./index.scss";
import { FaRegUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa";

const Login = () => {
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
            <input type="email" name="email" placeholder="Username@gmail.com" />
          </div>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="sec-2">
            {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
            <FaLock />
            <input
              className="pas"
              type="password"
              name="password"
              placeholder="············"
            />
            {/* <ion-icon class="show-hide" name="eye-outline"></ion-icon> */}
            <FaEye className="show-hide" />
          </div>
        </div>
        <button className="login">Login</button>
        <div className="footerL">
          <span>Sign up</span>
          <span>Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
