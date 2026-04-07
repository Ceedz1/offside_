import  { Router } from "express";
import { cache } from "../cache.ts";
import type { NewsAPIResponse } from "../types.ts";

const router = Router();
const CACHE_KEY = "football-news";
const CACHE_TTL_MS = 3600000; // Cache for 1 hour

router.get("/", async (req, res) => {
    try {
        // Check if we have cached data
        const cached = cache.get<NewsAPIResponse>(CACHE_KEY);
        if(cached) {
            return res.json({ source: "cache", data: cached });
        }

        console.log("[api] Fetching from NewsAPI...");
        const apiKey = process.env.NEWS_API_KEY;
        if (!apiKey) throw new Error("NEWS_API_KEY is not set in .env");

        // const url = `https://newsapi.org/v2/everything?q=soccer&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;
        // This is much cleaner and strictly categorized by the API providers
        const url = `https://newsapi.org/v2/everything?q=(football OR soccer) AND "La Liga"&domains=bbc.com,goal.com,skysports.com,theguardian.com,espn.com&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as NewsAPIResponse;
        // Cache the data
        cache.set(CACHE_KEY, data, CACHE_TTL_MS); 
        
        return res.json({ source: "api", data });
    } catch (error) {
        console.error("[error]", error);
        return res.status(500).json({ error: "Failed to fetch news" });
    }
});

export default router;

