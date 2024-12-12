import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import '../styles/index.css'

const SignupPage = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value || '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(credentials);
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        }
    };


    return (
        <div className="signup-page">
            <div style={{ marginBottom: '10rem' }}></div>
             <h1 className="login-header">Sign Up</h1> {/* TODO: switch to signup or make a generic one */}
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={credentials.name || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <Button type="submit" className="primary-btn">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignupPage;