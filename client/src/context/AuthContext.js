import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { register as registerUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (credentials) => {
        return registerUser(credentials);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                const expirationTime = decodedToken.exp * 1000 - Date.now();

                if (expirationTime > 0) {
                    setUser(decodedToken);
                    const timer = setTimeout(() => {
                        console.warn('Token expired, logging out');
                        localStorage.removeItem('token');
                        setUser(null);
                    }, expirationTime);

                    return () => clearTimeout(timer);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
