import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate('/');
        } catch (err) {
            setError('Registration failed. Username or email might be taken.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-darker">
            <div className="bg-card p-8 rounded-lg shadow-xl w-full max-w-md border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full bg-darker border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-darker border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-darker border border-gray-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-2 rounded transition font-semibold">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
