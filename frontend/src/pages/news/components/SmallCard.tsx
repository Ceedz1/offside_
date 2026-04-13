import type { Article } from "../../../types";
import ShareIcon from "../../../components/ShareIcon";
import { formatDate } from "../../../utils/formatDate";
import { timeAgo } from '../../../utils/timeAgo';

interface Props {
  article: Article;
  variant?: "default" | "barcelona";
}

export default function SmallCard({ article, variant = "default" }: Props) {
  const borderColor = variant === "barcelona" ? "border-[#a50044]/30 hover:border-[#a50044]" : "border-gray-800 hover:border-gray-600";

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-xl overflow-hidden border ${borderColor} hover:border-gray-600 transition-colors`}
    >
      <div className="h-48 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-2xl">
            ⚽
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <span className="text-sm text-gray-500">{formatDate(article.publishedAt)}</span>
        <h3 className="text-[16px] font-semibold text-white leading-snug line-clamp-3 group-hover:text-gray-300 transition-colors">
          {article.title}
        </h3>
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
        <div className="flex justify-end mt-auto pt-2">
          <ShareIcon />
        </div>
      </div>
    </a>
  );
}