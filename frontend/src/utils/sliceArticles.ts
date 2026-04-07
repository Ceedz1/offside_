import type { Article } from "../types";

export function sliceArticles(articles: Article[]) {
    return {
        hero:articles[0] ?? null,
        topGrid: articles.slice(1,5),
        midRow1: articles.slice(5, 7),
        midRow2: articles.slice(7, 11),
        bottomRow: articles.slice(11, 15),
    };
}