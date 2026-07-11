import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // Verify token and get user data
                    const res = await api.get('/api/auth/user');
                    setUser(res.data);
                } catch (err) {
                    console.error("Auth Load Error", err);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post('/api/auth/login', {
            email,
            password,
        });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        // User will be loaded by effect
    };

    const register = async (username, email, password) => {
        const res = await api.post('/api/auth/register', {
            username,
            email,
            password,
        });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
