export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string,
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface ApiResponse {
    source: "cache" | "api";
    data: {
        status: string;
        totalResults: number;
        articles: Article[];
    };
}