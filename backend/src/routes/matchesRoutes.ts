import { Router } from 'express';
import { cache } from '../cache';
import { APIFootballResponse } from '../types';

const router = Router();
const CACHE_TTL = 60; //1 minute - matches change frequently

const COMPETITION_IDS: Record<string, number> = {
    PL: 39,     // Premier League
    PD: 140,    // La Liga
    BL1: 78,    // Bundesliga
    SA: 135,    // Serie A
    FL1: 61,    // Ligue 1
};

router.get("/", async (req, res) => {
    try {
        const date = (req.query.date as string) ?? new Date().toISOString().split("T")[0];
        const competition = req.query.competition as string | undefined;
        const leagueId = competition ? COMPETITION_IDS[competition] : undefined;
        
        const CACHE_KEY = `matches-${date}`;
        
        const cached = cache.get<APIFootballResponse>(CACHE_KEY);
        if (cached) {
            console.log(`[cache] Serving matches for ${date} from cache`);
            return res.json({ source: "cache", data: cached });
        }

        console.log(`[api] Fetching matches for ${date}...`);
        const apiKey = process.env.FOOTBALL_API_KEY;
        if(!apiKey) throw new Error("FOOTBALL_API_KEY is not set in .env");

        const url = leagueId
            ? `https://v3.football.api-sports.io/fixtures?date=${date}&league=${leagueId}`
            : `https://v3.football.api-sports.io/fixtures?date=${date}`;

        const response = await fetch(url, {
            headers: { "x-apisports-key": apiKey },
        });

        if (!response.ok) throw new Error(`API-Football error: ${response.status}`);

        const data = (await response.json()) as APIFootballResponse;
        cache.set(CACHE_KEY, data, CACHE_TTL);

        return res.json({ source: "api", data});
    } catch (error) {
        console.log("[error]", error);
        return res.status(500).json({ error: "Failed to fetch matches" });
    }
});

export default router;