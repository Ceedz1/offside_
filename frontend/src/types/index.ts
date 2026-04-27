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

// ─── Matches ──────────────────────────────────────────

export interface APIFootballTeam {
    id: number;
    name: string;
    logo: string;
}

export interface APIFootballFixture {
    fixture: {
        id: number;
        date: string;
        status: { short: string; long: string; elapsed: number | null };
    };
    league: {
        id: number;
        name: string;
        logo: string;
        round: string;
    };
    teams: {
        home: APIFootballTeam;
        away: APIFootballTeam;
    };
    goals: {
        home: number | null;
        away: number | null;
    };
}

export interface APIFootballResponse {
    response: APIFootballFixture[];
}