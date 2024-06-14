import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/Header";
import "./AuthForm.css";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('auth/login', {name, password});

      if (response.data) {
        const token = response.data.token;
        if (token) {
          login(token);
          navigate("/");
        } else {
          setError("Token not found in response.");
        }
      } else {
        setError("No response data.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="upContainer">
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit} className="formLogin">
          <h1 className="loginTitle">Login</h1>
          <img src={logo} alt="logo" className="imgLogin" />
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
