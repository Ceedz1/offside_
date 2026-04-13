import type { Article } from '../../../types';
import ShareIcon from '../../../components/ShareIcon';
import { formatDate } from '../../../utils/formatDate';
import { timeAgo } from '../../../utils/timeAgo';

interface Props {
    article: Article;
    variant?: "default" | "barcelona";
}

export default function HerCard({ article, variant = "default" }:Props) {
    //const cardBg = variant === "barcelona" ? "bg-[#1a0010]" : "bg-[#1a1a1a]";
    const cardBg = variant === "barcelona" 
    ? "bg-gradient-to-r from-[#a50044]/20 to-[#004d98]/20" 
    : "bg-[#1a1a1a]";
    const borderColor = variant === "barcelona" ? "border-[#a50044]/30 hover:border-[#a50044]" : "border-gray-800 hover:border-gray-600";

    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className={`group grid grid-cols-1 sm:grid-cols-[6fr_4fr] ${cardBg} rounded-xl overflow-hidden border ${borderColor} hover:border-gray-600 transition-all duration-300`}>
            <div className="h-72 sm:h-96 overflow-hidden bg-gray-800">
                {article.urlToImage ? (
                    <img 
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 text-4xl">
                        ⚽
                    </div>
                )}
            </div>

            <div className="flex flex-col p-5 justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-sm text-gray-400">{formatDate(article.publishedAt)}</span>
                    <h2 className="text-[24px] font-bold text-white leading-snug group-hover:text-gray-200 transition-colors line-clamp-3">
                        {article.title}
                    </h2>
                    {article.description && (
                        <p className="text-[16px] text-gray-400 line-clamp-4">
                            {article.description}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${article.url}&sz=32`}
                        alt={article.source.name}
                        className="w-5 h-5 rounded-full"
                    />
                    {article.author && (
                        <>
                        <span className="line-clamp-1">{article.author}</span>
                        <span className="text-gray-600">·</span>
                        </>
                    )}
                    <span>{timeAgo(article.publishedAt)}</span>
                </div>
                <div className="flex justify-end mt-4">
                    <ShareIcon />
                </div>
            </div>
        </a>
    )
}