import React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/HomePage";
import AboutUs from "../../pages/about/AboutUs";
import ContactUs from "../../pages/contact/ContactUs";
import Details from "../../pages/details/Details";
import NavBar from "./NavBar";
function Header() {
  return (
    <Router>
      <NavBar />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Header;
