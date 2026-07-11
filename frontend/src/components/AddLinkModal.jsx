import { useState, useEffect } from 'react';
import api from '../api';
import { X, Loader2, Plus, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

const AddLinkModal = ({ isOpen, onClose, onAdd }) => {
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');

    // Debounce preview fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            if (url && isValidUrl(url)) {
                fetchPreview();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [url]);

    const isValidUrl = (string) => {
        if (!string) return false;
        let testStr = string.trim();
        if (!/^https?:\/\//i.test(testStr)) {
            testStr = 'https://' + testStr;
        }
        try {
            const parsed = new URL(testStr);
            return parsed.hostname.includes('.') || parsed.hostname === 'localhost';
        } catch (_) {
            return false;
        }
    };

    const fetchPreview = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/api/links/preview', { url });
            setPreview(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch preview');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!preview) return;

        try {
            const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
            await onAdd({ ...preview, tags: tagArray });
            handleClose();
        } catch (err) {
            setError('Failed to save link');
        }
    };

    const handleClose = () => {
        setUrl('');
        setPreview(null);
        setTags('');
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-darker/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Plus className="text-primary" /> Add New Link
                    </h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 mb-2 font-medium">URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LinkIcon className="text-gray-500" size={18} />
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-darker border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                                    placeholder="example.com or https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {loading && (
                            <div className="flex items-center justify-center py-8 text-primary">
                                <Loader2 className="animate-spin mr-2" /> Fetching metadata...
                            </div>
                        )}

                        {preview && !loading && (
                            <div className="bg-darker rounded-xl border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300">
                                {preview.image ? (
                                    <img src={preview.image} alt="Preview" className="w-full h-48 object-cover" />
                                ) : (
                                    <div className="h-32 bg-white/5 flex items-center justify-center text-gray-500">
                                        <ImageIcon size={48} opacity={0.5} />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-white mb-1">{preview.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">{preview.description}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-400 mb-2 font-medium">Tags (comma separated)</label>
                            <input
                                type="text"
                                className="w-full bg-darker border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition"
                                placeholder="react, docs, tutorial"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!preview || loading}
                                className="w-full bg-primary hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                            >
                                Save to Vault
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLinkModal;
