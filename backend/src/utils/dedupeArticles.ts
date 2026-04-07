import type { NewsAPIArticle } from "../types";

export function dedupeArticles(articles: NewsAPIArticle[]): NewsAPIArticle[] {
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();

  return articles.filter((article) => {
    // Normalize title — lowercase and strip punctuation for comparison
    const normalizedTitle = article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

    if (seenUrls.has(article.url) || seenTitles.has(normalizedTitle)) {
      return false;
    }

    seenUrls.add(article.url);
    seenTitles.add(normalizedTitle);
    return true;
  });
}