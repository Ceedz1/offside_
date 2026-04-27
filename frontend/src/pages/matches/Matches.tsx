import { useEffect, useState } from 'react';
import type { APIFootballFixture } from '../../types';
import FilterSection from './components/FilterSection';
import MatchCard from './components/MatchCard';

function groupByLeague(fixtures: APIFootballFixture[]) {
    return fixtures.reduce<Record<string, { name: string; logo: string; round: string; fixtures: APIFootballFixture[] }>>(
        (acc, fixture) => {
            const { id, name, logo, round } = fixture.league;
            if (!acc[id]) acc[id] = { name, logo, round, fixtures: [] };
            acc[id].fixtures.push(fixture);
            return acc;
        },
        {}
    );
}

export default function Matches() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedCompetition, setSelectedCompetition] = useState('');
    const [fixtures, setFixtures] = useState<APIFootballFixture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams({ date: selectedDate });
                if (selectedCompetition) params.set('competition', selectedCompetition);

                const res = await fetch(`http://localhost:5000/api/matches?${params}`);
                if (!res.ok) throw new Error('Failed to fetch matches');

                const json = await res.json();
                setFixtures(json.data.response ?? []);
            } catch (err) {
                console.error(err);
                setError('Failed to load matches. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [selectedDate, selectedCompetition]);

    const grouped = groupByLeague(fixtures);

    const selectedDateLabel = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    const monthLabel = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { month: 'long' });

    return (
        <div className="min-h-screen bg-[#0B0D11] text-white pt-24 px-12 pb-12">
            <h1 className="text-xl font-bold mb-6">Matches on the month of: {monthLabel}</h1>

            <FilterSection
                selectedDate={selectedDate}
                selectedCompetition={selectedCompetition}
                onDateChange={setSelectedDate}
                onCompetitionChange={setSelectedCompetition}
            />

            <div className="mt-8">
                {loading && <p className="text-gray-500 text-sm">Loading matches...</p>}
                {error && <p className="text-red-400 text-sm">{error}</p>}

                {!loading && !error && Object.keys(grouped).length === 0 && (
                    <p className="text-gray-500 text-sm">No matches found for this day.</p>
                )}

                {!loading && !error && (
                    <div className="flex flex-col gap-10">
                        <div>
                            <p className="text-sm font-bold text-blue-400 mb-1">
                                {selectedDate === today ? "Today's Match" : 'Matches'}
                            </p>
                            <p className="text-xs text-gray-400 mb-6">{selectedDateLabel}</p>
                        </div>

                        {Object.entries(grouped).map(([leagueId, league]) => (
                            <div key={leagueId}>
                                {/* League header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={league.logo} alt={league.name} className="w-8 h-8 object-contain" />
                                    <div>
                                        <p className="text-sm font-semibold">{league.name}</p>
                                        <p className="text-xs text-gray-400">{league.round}</p>
                                    </div>
                                </div>

                                {/* Match cards */}
                                <div className="flex flex-wrap gap-3">
                                    {league.fixtures.map(f => (
                                        <MatchCard key={f.fixture.id} match={f} />
                                    ))}
                                </div>

                                <button className="mt-4 text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
                                    Go to standings <span>›</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}