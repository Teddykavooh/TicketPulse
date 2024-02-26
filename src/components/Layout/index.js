import "./index.scss";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import NavBar from "../NavBar";

const Layout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
