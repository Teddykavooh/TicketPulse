// import logo from "./logo.svg";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Events from "./components/Events";
import Contact from "./components/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route index element={<Home />}></Route>
      <Route path="events" element={<Events />}></Route>
      <Route path="contact" element={<Contact />}></Route>
    </Routes>
  );
}

export default App;
