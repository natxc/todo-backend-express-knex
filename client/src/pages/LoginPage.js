import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

const LoginPage = ({ toggleAuthMode }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            console.log('Login succeeded');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password');
        }
    };

    return (
        <div>
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

            <div className="auth-toggle">
                <p>Don't have an account?</p>
                <button className="toggle-btn" onClick={toggleAuthMode}>
                    Sign Up Here
                </button>
            </div>

            <style jsx>{`
                .login-header {
                    margin-bottom: 2rem;
                    font-size: 2rem;
                    color: #333;
                    text-align: center;
                }

                .login-form {
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
                    background-color: #007BFF;
                    color: white;
                    cursor: pointer;
                }

                .auth-toggle {
                    margin-top: 2rem;
                    font-size: 0.9rem;
                    color: #333;
                    text-align: center;
                }

                .toggle-btn {
                    background: none;
                    border: none;
                    color: #007BFF;
                    cursor: pointer;
                    text-decoration: underline;
                }

                .toggle-btn:hover {
                    color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
