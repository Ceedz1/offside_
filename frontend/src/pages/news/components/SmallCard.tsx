import type { Article } from "../../../types";
import ShareIcon from "../../../components/ShareIcon";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  article: Article;
}

export default function SmallCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors"
    >
      <div className="h-28 overflow-hidden bg-gray-800">
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

      <div className="flex flex-col flex-1 p-3 gap-1">
        <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
        <h3 className="text-xs font-semibold text-white leading-snug line-clamp-3 group-hover:text-gray-300 transition-colors">
          {article.title}
        </h3>
        <div className="flex justify-end mt-auto pt-2">
          <ShareIcon />
        </div>
      </div>
    </a>
  );
}