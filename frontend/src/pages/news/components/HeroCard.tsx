import type { Article } from '../../../types';
import ShareIcon from '../../../components/ShareIcon';
import { formatDate } from '../../../utils/formatDate';
import { timeAgo } from '../../../utils/timeAgo';

interface Props {
    article: Article;
}

export default function HerCard({ article }:Props) {
    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-1 sm:grid-cols-[6fr_4fr] bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300">
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
                    <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
                    <h2 className="text-[24px] font-bold text-white leading-snug group-hover:text-gray-200 transition-colors line-clamp-3">
                        {article.title}
                    </h2>
                    {article.description && (
                        <p className="text-[16px] text-gray-400 line-clamp-4">
                            {article.description}
                        </p>
                    )}
                    {article.author && (
                        <p className="text-[16px] text-gray-400 line-clamp-4">
                            {article.author}
                        </p>
                    )}
                </div>
                <span className="text-sm text-gray-500">{timeAgo(article.publishedAt)}</span>
                <div className="flex justify-end mt-4">
                    <ShareIcon />
                </div>
            </div>
        </a>
    )
}