import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; 
import Portfolio from "./components/Portfolio/Portfolio"; 
import Home from "./components/Home/Home"; 
import Footer from "./components/Footer/Footer"; 
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
