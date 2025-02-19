import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

const SignupPage = ({ toggleAuthMode }) => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(credentials);
            await login({ email: credentials.email, password: credentials.password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h1 className="signup-header">Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={credentials.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
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
                    Sign Up
                </Button>
            </form>

            <div className="auth-toggle">
                <p>Already have an account?</p>
                <button className="toggle-btn" onClick={toggleAuthMode}>
                    Log In Here
                </button>
            </div>

            <style jsx>{`
                .signup-header {
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    color: #333;
                    text-align: center;
                }

                .signup-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .input-field {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .primary-btn {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    border: none;
                    border-radius: 10px;
                    background-color: #28A745;
                    color: white;
                    cursor: pointer;
                }

                .auth-toggle {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    color: #333;
                    text-align: center;
                }

                .toggle-btn {
                    background: none;
                    border: none;
                    color: #28A745;
                    cursor: pointer;
                    text-decoration: underline;
                }

                .toggle-btn:hover {
                    color: #1E7E34;
                }
            `}</style>
        </div>
    );
};

export default SignupPage;
