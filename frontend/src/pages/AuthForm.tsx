import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../components/Header";
import './AuthForm.css';
import logo from '../assets/logo.png';

interface AuthFormProps {
    isRegister?: boolean;
}

function AuthForm({ isRegister = false }: AuthFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const url = isRegister ? 'http://localhost:3000/auth/register' : 'http://localhost:3000/auth/login';
            const payload = isRegister ? { name, email, password } : { name, password };
            const response = await axios.post(url, payload);

            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error: any) {
            setError(error.response.data.message);
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <form onSubmit={handleSubmit} className="formLogin">
                    <h1 className="loginTitle">{isRegister ? 'Register' : 'Login'}</h1>
                    <img src={logo} alt="logo" className="imgLogin" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    {isRegister && (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                </form>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AuthForm;
