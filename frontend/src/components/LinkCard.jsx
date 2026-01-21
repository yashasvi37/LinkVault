import { ExternalLink, Trash2, Tag } from 'lucide-react';

const LinkCard = ({ link, onDelete }) => {
    return (
        <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition duration-300 break-inside-avoid mb-4 group relative">
            {link.image && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={link.image}
                        alt={link.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            )}

            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                        {link.title || link.originalUrl}
                    </a>
                </h3>

                {link.description && (
                    <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                        {link.description}
                    </p>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                    {link.tags?.map((tag, index) => (
                        <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded-full flex items-center gap-1">
                            <Tag size={10} /> {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                    <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                        <ExternalLink size={12} /> Visit
                    </a>
                    <button
                        onClick={() => onDelete(link._id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                        title="Delete Link"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
