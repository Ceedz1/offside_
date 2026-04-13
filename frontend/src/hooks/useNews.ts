import { useEffect, useState } from 'react';
import type { Article, ApiResponse } from '../types';

export function useNews() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/news")
            .then((res) => {
                if(!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<ApiResponse>;
            })
            .then((json) => {
                const clean = json.data.articles.filter((a) => a.title !== "[Removed]" && a.urlToImage);
                setArticles(clean);
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    },[]);
    return { articles, loading, error };
}

export function useNewsBarcelona() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetch("/api/news/barcelona")
            .then((res) => {
                if(!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json() as Promise<ApiResponse>;
            })
            .then((json) => {
                const clean = json.data.articles.filter((a) => a.title !== "[Removed]" && a.urlToImage);
                setArticles(clean);
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { articles, loading, error };
}