import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Shield, Eye, EyeOff, LayoutGrid, CheckCircle, Github, Youtube, Globe, Chrome } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials. Please verify your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darker via-slate-950 to-dark relative overflow-hidden px-4 bg-grid-pattern">
            {/* Decorative Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none"></div>

            {/* Floating Background Link Cards - Left Side */}
            <div className="absolute top-[12%] left-[6%] opacity-25 hover:opacity-85 transition-opacity duration-300 pointer-events-none lg:pointer-events-auto animate-float-slow hidden xl:block z-10">
                <div className="bg-card/45 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl flex items-center gap-3.5 transform -rotate-3 hover:scale-105 transition-transform duration-200">
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-white/10">
                        <Github className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white">GitHub</div>
                        <div className="text-[10px] text-gray-500">github.com/profile</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[16%] left-[10%] opacity-25 hover:opacity-85 transition-opacity duration-300 pointer-events-none lg:pointer-events-auto animate-float-medium hidden xl:block z-10">
                <div className="bg-card/45 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl flex items-center gap-3.5 transform rotate-6 hover:scale-105 transition-transform duration-200">
                    <div className="w-9 h-9 rounded-lg bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-500">
                        <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white">YouTube</div>
                        <div className="text-[10px] text-gray-500">youtube.com/watch</div>
                    </div>
                </div>
            </div>

            {/* Floating Background Link Cards - Right Side */}
            <div className="absolute top-[18%] right-[8%] opacity-25 hover:opacity-85 transition-opacity duration-300 pointer-events-none lg:pointer-events-auto animate-float-medium hidden xl:block z-10">
                <div className="bg-card/45 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl flex items-center gap-3.5 transform rotate-3 hover:scale-105 transition-transform duration-200">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/40 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Chrome className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white">Google Chrome</div>
                        <div className="text-[10px] text-gray-500">google.com/search</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[20%] right-[12%] opacity-25 hover:opacity-85 transition-opacity duration-300 pointer-events-none lg:pointer-events-auto animate-float-slow hidden xl:block z-10">
                <div className="bg-card/45 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl flex items-center gap-3.5 transform -rotate-6 hover:scale-105 transition-transform duration-200">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white">Vercel Deploy</div>
                        <div className="text-[10px] text-gray-500">vercel.com/dashboard</div>
                    </div>
                </div>
            </div>

            {/* Split Screen Container */}
            <div className="w-full max-w-4xl bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 min-h-[550px] relative z-20">
                
                {/* Left side: Branding / Marketing */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/5 to-indigo-950/20 border-r border-white/5 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_50%)] opacity-5 pointer-events-none"></div>
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="text-primary w-8 h-8 animate-pulse" />
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">LinkVault</span>
                    </div>
                    
                    <div className="space-y-6 my-auto">
                        <h3 className="text-3xl font-extrabold leading-tight text-white">
                            Securely organize your digital universe.
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            LinkVault helps you store, tag, and visually preview all your bookmarks, articles, and references in one secure, private dashboard.
                        </p>
                        
                        <div className="space-y-3 pt-4">
                            {[
                                "Instant metadata & preview generation",
                                "Dynamic search and tag organization",
                                "Highly secure, JWT-authenticated repository"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} LinkVault. All rights reserved.
                    </div>
                </div>

                {/* Right side: Login Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="md:hidden flex items-center gap-2 mb-6 justify-center">
                            <LayoutGrid className="text-primary w-7 h-7" />
                            <span className="text-2xl font-bold tracking-tight text-white">LinkVault</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
                        <p className="text-gray-400 text-sm">Please enter your details to sign in</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 mb-6 flex items-center gap-2 animate-shake">
                            <Shield className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="email"
                                    className="w-full bg-darker/40 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-darker/40 border border-white/10 rounded-lg py-2.5 pl-11 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline font-semibold">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
