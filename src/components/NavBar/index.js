import "./index.scss";
import { FaHome, FaList } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <NavLink
          exact="true"
          className="navlink"
          // activeclassname="active"
          to="/"
        >
          <FaHome />
          <p>Home</p>
        </NavLink>
        <NavLink
          exact="true"
          // className="navlink"
          activeclassname="active"
          to="/events"
        >
          <FaList />
          <p>Events</p>
        </NavLink>
        <NavLink
          exact="true"
          // className="navlink"
          activeclassname="active"
          to="/contact"
        >
          <BiSupport />
          <p>Contact Us</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
