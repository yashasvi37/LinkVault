import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Plus, Search, LogOut, LayoutGrid } from 'lucide-react';
import LinkCard from '../components/LinkCard';
import AddLinkModal from '../components/AddLinkModal';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/links');
            setLinks(res.data);
            setFilteredLinks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Client-side filtering for immediate feedback, or server-side?
    // Let's do client side for "instant" feel since we fetched all.
    useEffect(() => {
        const term = search.toLowerCase();
        const results = links.filter(link =>
            (link.title && link.title.toLowerCase().includes(term)) ||
            (link.tags && link.tags.some(tag => tag.toLowerCase().includes(term)))
        );
        setFilteredLinks(results);
    }, [search, links]);

    const handleAddLink = async (newLinkData) => {
        try {
            // Optimistic update or refetch?
            // POST new link
            const res = await axios.post('http://localhost:5000/api/links', newLinkData);
            setLinks([res.data, ...links]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this link?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/links/${id}`);
            setLinks(links.filter(l => l._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-darker text-white font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-darker/80 backdrop-blur-md border-b border-white/5 py-4 px-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <LayoutGrid className="text-primary" />
                    <h1 className="text-2xl font-bold tracking-tight">LinkVault</h1>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or #tag..."
                        className="w-full bg-card/50 border border-white/10 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:bg-card transition"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 hidden md:inline">Welcome, {user?.username}</span>
                    <button
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-4 pb-20">
                {/* Masonry Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading your vault...</div>
                ) : filteredLinks.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400 mb-4">Your vault is empty.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition shadow-lg shadow-primary/20"
                        >
                            Add your first link
                        </button>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {filteredLinks.map(link => (
                            <LinkCard key={link._id} link={link} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </main>

            {/* Floating Add Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 bg-primary hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl shadow-primary/30 hover:scale-105 transition active:scale-95 z-40 group"
            >
                <Plus size={28} />
                <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none">
                    Add Link
                </span>
            </button>

            <AddLinkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddLink}
            />
        </div>
    );
};

export default Dashboard;
