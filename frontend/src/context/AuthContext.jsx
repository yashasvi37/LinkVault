import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Configure axios defaults
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Ensure Bearer prefix if backend expects it
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    // Verify token and get user data
                    // Assuming backend needs 'Bearer ' prefix, but my middleware tolerated both. 
                    // Let's stick to standard practice.
                    axios.defaults.headers.common['Authorization'] = token;
                    const res = await axios.get('http://localhost:5000/api/auth/user');
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
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
        });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        // User will be loaded by effect
    };

    const register = async (username, email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
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
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
