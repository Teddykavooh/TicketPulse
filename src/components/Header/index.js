import "./index.scss";
import { BiSupport } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";

const Header = () => {
  return (
    <div className="header">
      <ul>
        <li>
          <a href="/contact">
            <BiSupport />
            <p>Contact Us</p>
          </a>
        </li>
        <li>
          <a href="/login">
            <VscAccount />
            <p>Account</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
