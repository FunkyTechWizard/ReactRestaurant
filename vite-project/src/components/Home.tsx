import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Restaurant Management System!</h1>
      <div className="home-links">
        <div className="card">
          <h2 className="home-subtitle1" >Get Started!</h2>
          <h2 className="home-subtitle">Sign Up Here!</h2>
          <Link to="/signup" className="home-link">
            Sign Up
          </Link>
          <h2 className="home-subtitle">Login Here!</h2>
          <Link to="/login" className="home-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
