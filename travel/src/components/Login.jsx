import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const naviagte = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'password') {
            localStorage.setItem('auth', 'true');
            naviagte('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
