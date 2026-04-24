export interface NewsAPIArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: NewsAPIArticle[];
}

//─── Matches ──────────────────────────────────────────

// export interface MatchesAPI {
//     id: number;
//     homeTeam: { name: string };
//     awayTeam: { name: string };
//     score: { fulltime: number | null; away: number | null };
//     utcDate: string;
//     status: string;
// }

// export interface MatchesAPIResponse {
//     matches: MatchesAPI[];
// }

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
