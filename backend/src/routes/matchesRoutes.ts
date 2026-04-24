import { Router } from 'express';
import { cache } from '../cache';
import { APIFootballResponse } from '../types';

const router = Router();
const CACHE_TTL = 60; //1 minute - matches change frequently

router.get("/", async (req, res) => {
    try {
        const date = (req.query.date as string) ?? new Date().toISOString().split("T")[0];
        const CACHE_KEY = `matches-${date}`;
        
        const cached = cache.get<APIFootballResponse>(CACHE_KEY);
        if (cached) {
            console.log(`[cache] Serving matches for ${date} from cache`);
            return res.json({ source: "cache", data: cached });
        }

        console.log(`[api] Fetching matches for ${date}...`);
        const apiKey = process.env.FOOTBALL_API_KEY;
        if(!apiKey) throw new Error("FOOTBALL_API_KEY is not set in .env");

        const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`,
            {
                headers: {
                    "x-apisports-key": apiKey,
                },
            }
        );
        if (!response.ok) {
            throw new Error(`API-Football error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as APIFootballResponse;
        cache.set(CACHE_KEY, data, CACHE_TTL);

        return res.json({ source: "api", data });
    } catch (error) {
        console.log("[error]", error);
        return res.status(500).json({ error: "Failed to fetch matches" });
    }
});

export default router;