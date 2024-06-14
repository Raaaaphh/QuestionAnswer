import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/Header";
import "./AuthForm.css";
import logo from "../assets/logo.png";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/");
      }
    };
    checkTokenAndNavigate();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const url = "/auth/register";
      const payload = { name, email, password };

      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
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
          <h1 className="loginTitle">Register</h1>
          <img src={logo} alt="logo" className="imgLogin" />
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default RegisterForm;
