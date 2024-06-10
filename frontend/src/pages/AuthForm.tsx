import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Header from "../components/Header";
import "./AuthForm.css";
import logo from "../assets/logo.png";

interface AuthFormProps {
  isRegister?: boolean;
}

function AuthForm({ isRegister = false }: AuthFormProps) {
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
      const url = isRegister ? "/auth/register" : "/auth/login";
      const payload = isRegister
        ? { name, email, password }
        : { name, password };

      console.log("Sending request to:", url);
      console.log("Payload:", payload);

      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response data:", response.data);

      if (response.data) {
        if (isRegister) {
          navigate("/auth/login");
        } else {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            navigate("/");
          } else {
            setError("Token not found in response.");
          }
        }
      } else {
        setError("No response data.");
      }
    } catch (error: any) {
      console.error("Error during submission:", error);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit} className="formLogin">
          <h1 className="loginTitle">{isRegister ? "Register" : "Login"}</h1>
          <img src={logo} alt="logo" className="imgLogin" />
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isRegister && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default AuthForm;
