import type { APIFootballFixture } from "../../../../../backend/src/types";

interface Props {
    match: APIFootballFixture;
}

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function StatusLabel({ match }: { match: APIFootballFixture }) {
    const { short } = match.fixture.status;
    const { elapsed } = match.fixture.status;

    if(short === 'FT') return <span className='text-sm text-gray-400'>Full time</span>;
    if(short === 'NS') return <span className='text-sm text-gray-400'>{formatTime(match.fixture.date)}</span>
    if (['1H', '2H', 'HT', 'ET', 'P'].includes(short)) return <span className='text--sm text-green-400'>{elapsed ?? short}'</span>;
    return <span className='text-sm text-gray-400'>{short}</span>;
}

export default function MatchCard({ match }: Props) {
    const { teams, goals } = match;
    const isLive = ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short);

    return (
        <div className={`bg-[#13151a] border ${isLive ? 'border-green-600' : 'border-gray-800'} rounded-lg p-3 flex flex-col gap-3 min-w-[220px]`}>
            <div className='text-center'>
                <p className='text-xs font-semibold text-white'>
                    {match.fixture.status.short === 'NS' ? formatTime(match.fixture.date) : `${goals.home ?? '-'} - ${goals.away ?? '-'}`}
                </p>
                <StatusLabel match={match} />
            </div>

            {/*Home */}
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <img src={teams.home.logo} alt={teams.home.name} className='w-6 h-6 object-contain' />
                    <span className='text-sm text-gray-300'>{teams.home.name}</span>
                </div>
                <span className='text-sm font-bold text-white'>{goals.home ?? '-'}</span>
            </div>
            {/*Away */}
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                    <img src={teams.away.logo} alt={teams.away.name} className='w-6 h-6 object-contain' />
                    <span className='text-sm text-gray-300'>{teams.away.name}</span>
                </div>
                <span className='text-sm font-bold text-white'>{goals.away ?? '-'}</span>
            </div>
        </div>
    );
}