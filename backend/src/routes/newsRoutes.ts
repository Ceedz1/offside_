import  { Router } from "express";
import { cache } from "../cache";
import type { NewsAPIResponse } from "../types.ts";
import { dedupeArticles } from "../utils/dedupeArticles";


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
        //const url = `https://newsapi.org/v2/everything?q=(football OR soccer) AND "La Liga"&domains=bbc.com,goal.com,skysports.com,theguardian.com,espn.com&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;
        //const url = `https://newsapi.org/v2/everything?q=("Premier League" OR "La Liga" OR "Bundesliga" OR "Serie A" OR "Ligue 1" OR "Champions League" OR "Europa League" OR "World Cup" OR "Nations League" OR "transfer" OR "Haaland" OR "Mbappe" OR "Messi" OR "Ronaldo" OR "Bellingham" OR "Salah" OR "Guardiola" OR "Barcelona" OR "Real Madrid" OR "Manchester City" OR "Liverpool" OR "Bayern Munich" OR "PSG")&domains=goal.com,football365.com,90min.com,fourfourtwo.com,footballitalia.net,theanalyst.com,footballparadise.com,caughtoffside.com,footballtransfers.com,planetfootball.com&language=en&sortBy=publishedAt&pageSize=40&apiKey=${apiKey}`;
        //const url = `https://newsapi.org/v2/everything?q=("Premier League" OR "La Liga" OR "Bundesliga" OR "Serie A" OR "Ligue 1" OR "Champions League" OR "Europa League" OR "World Cup" OR "transfer" OR "Haaland" OR "Mbappe" OR "Messi" OR "Ronaldo" OR "Bellingham" OR "Salah" OR "Barcelona" OR "Real Madrid" OR "Manchester City" OR "Liverpool" OR "Bayern Munich" OR "PSG")&domains=bbc.com, goal.com&language=en&sortBy=publishedAt&pageSize=40&apiKey=${apiKey}`;
        
        const url = `https://newsapi.org/v2/everything?q=("Premier League" OR "La Liga" OR "Bundesliga" OR "Serie A" OR "Ligue 1" OR "Champions League" OR "Europa League" OR "World Cup" OR "transfer" OR "Haaland" OR "Mbappe" OR "Messi" OR "Cristiano Ronaldo" OR "Bellingham" OR "Rashford" OR "Pedri" OR "Barcelona" OR "Inter Miami" OR "Real Madrid" OR "Manchester City" OR "Liverpool" OR "Bayern Munich" OR "PSG") NOT (cricket OR IPL OR NBA OR basketball OR NFL OR rugby OR tennis OR golf OR F1 OR boxing OR cycling OR baseball OR hockey)&language=en&sortBy=publishedAt&pageSize=40&apiKey=${apiKey}`;
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as NewsAPIResponse;
        // Dedupe data first
        data.articles = dedupeArticles(data.articles);
        // Cache the data
        cache.set(CACHE_KEY, data, CACHE_TTL_MS); 
        
        return res.json({ source: "api", data });
    } catch (error) {
        console.error("[error]", error);
        return res.status(500).json({ error: "Failed to fetch news" });
    }
});

//─── Barcelona News ──────────────────────────────────────────

const BARCA_CACHE_KEY = "barca-news";
const BARCA_CACHE_TTL = 3600;

router.get("/barcelona", async (req, res) => {
    try {
        //check data if cached
        const cached = cache.get<NewsAPIResponse>(BARCA_CACHE_KEY );
        if(cached) {
            return res.json({ source: "cache", data: cached });
        }

        console.log("[api] Fetching from NewsAPI...");
        const apiKey = process.env.NEWS_API_KEY;
        if (!apiKey) throw new Error("NEWS_API_KEY is not set in .env");

        //const url = `https://newsapi.org/v2/everything?q=("FC Barcelona" OR Barca OR Pedri OR "Lamine Yamal" OR Rashford) NOT (cricket OR IPL OR NBA OR NFL OR rugby OR tennis OR golf OR F1 OR boxing OR cycling OR baseball OR hockey)&domains=bbc.co.uk,theguardian.com,skysports.com,espn.com,reuters.com,apnews.com&language=en&sortBy=publishedAt&pageSize=40&apiKey=${apiKey}`;
        const url = `https://newsapi.org/v2/everything?qInTitle=Barcelona OR Barca OR Blaugrana OR "Camp Nou" OR Pedri OR Gavi OR Yamal OR Raphinha OR Lewandowski OR Flick OR Cubarsí OR Dani Olmo OR Casado OR Bernal OR Fermin OR Koundé&language=en&sortBy=publishedAt&pageSize=40&apiKey=${apiKey}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as NewsAPIResponse;
        data.articles = dedupeArticles(data.articles);
        cache.set(BARCA_CACHE_KEY, data, BARCA_CACHE_TTL);

        return res.json({ source: "api", data });

    } catch (error) {
        console.log("[error]", error);
        return res.status(500).json({ error: "Failed to fetch news "});
    }
});


export default router;

