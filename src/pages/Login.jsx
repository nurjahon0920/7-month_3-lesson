import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import StyledButton from "../components/shared/StyledButton";
import "./Post.css";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="container py-5">
      <form onSubmit={loginHandleSubmit} className="login_form">
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Login</StyledButton>
      </form>
    </div>
  );
};

export default Login;
