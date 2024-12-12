import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            console.log('Login succeeded, navigating to homepage');
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password');
        }
    };


    return (
        <div className="login-page">
            <div style={{ marginBottom: '10rem' }}></div>
            <h1 className="login-header">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" className="primary-btn">
                    Login
                </Button>
            </form>
            <div className="signup-redirect">
                <p>Don't have an account?</p>
                <Link to="/signup" className="signup-link">
                    Sign Up Here
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;