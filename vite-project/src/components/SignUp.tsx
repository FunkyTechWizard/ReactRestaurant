import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Import the CSS file

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: username,
        password: password,
      });

      // Check if registration was successful based on the response status
      if (response.status === 201) {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("An error occurred during sign up:", error);
    }
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setIsRegistered(false);
  };

  return (
    <div className="login-container">
      <div className="contact-form">
        <h2 className="hiii">Sign Up</h2>
        <label className="hiii">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label className="hiii">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {isRegistered ? (
          <>
            <div className="message-container">
              <p className="hiii">Registration successful!</p>
            </div>
            <div className="button-container">
              <button className="btn2" onClick={handleReset}>
                Reset
              </button>

              <button className="btn2">
                <Link to="/" className="hiii">
                  Go to Home
                </Link>
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="btn" onClick={handleSignUp}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
