// import logo from "./logo.svg";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Event from "./components/Event";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="events/:id" element={<Event />} />
      </Route>
    </Routes>
  );
}

export default App;
