import React, { useState, createContext, useContext } from "react";
import "./Home.css"; // Import the CSS file
import axios from "axios";

// Define the types for context and its values
interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

// Create the authentication context with default values
const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});

// Custom hook to access the authentication context
const useAuth = () => useContext(AuthContext);

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: username,
        password: password,
      });

      const { token } = response.data;

      // Save the token to local storage
      localStorage.setItem("token", token);

      // Set the login status
      setIsLoggedIn(true);

      // Clear the error, if any
      setError("");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Clear the login status
    setIsLoggedIn(false);

    setUsername("");
    setPassword("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      <div className="login-container">
        <AuthStatus />
        {!isLoggedIn ? (
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error={error}
          />
        ) : (
          <LogoutButton handleLogout={handleLogout} />
        )}
      </div>
    </AuthContext.Provider>
  );
};

const AuthStatus = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <p className="hip">Welcome {localStorage.getItem("username")}!</p>
  ) : null;
};

interface LoginFormProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => Promise<void>;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  error,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="contact-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

interface LogoutButtonProps {
  handleLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLogout();
  };

  return <button onClick={handleClick} className="hiip">Logout</button>;
};

export default LoginPage;
export { useAuth };
