import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const COMPETITIONS = [
    { label: 'All competitions', value: '' },
    { label: 'Premier League', value: 'PL' },
    { label: 'La Liga', value: 'PD' },
    { label: 'Bundesliga', value: 'BL1' },
    { label: 'Serie A', value: 'SA' },
    { label: 'Ligue 1', value: 'FL1' },
];

function getDayStrip(centerDate: Date) {
    const days = [];
    for (let i = -1; i <= 4; i++) {
        const d = new Date(centerDate);
        d.setDate(d.getDate() + i);
        days.push(d);
    }
    return days;
}

function formatDate(d: Date) {
    return d.toISOString().split('T')[0];
}

function dayLabel(d: Date, today: Date) {
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (diff === -1) return 'Yesterday';
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';

    return d.toLocaleDateString('en-GB', { day: 'numeric', weekday: 'short' });
}

interface Props {
    selectedDate: string;
    selectedCompetition: string;
    onDateChange: (date: string) => void;
    onCompetitionChange: (comp: string) => void;
}

export default function FilterSection({ selectedDate, selectedCompetition, onDateChange, onCompetitionChange }: Props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [centerDate, setCenterDate] = useState(today);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const days = getDayStrip(centerDate);

    const shift = (n: number) => {
        const d = new Date(centerDate);
        d.setDate(d.getDate() + n);
        setCenterDate(d);
    };

    const selectedLabel = COMPETITIONS.find(c => c.value === selectedCompetition)?.label ?? 'All competitions';
    
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-end gap-10'>
                {/*Competition dropdown */}
                <div className='flex flex-col gap-1'>
                    <span className='text-xs text-gray-400'>Category</span>
                    <div className='relative'>
                        <button onClick={() => setDropdownOpen(o => !o)} className='flex items-center gap-2 bg-[#13151a] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 hover:border-gray-500 transition-colors cursor-pointer min-w-[180px] justify-between'>
                            {selectedLabel}
                            <ChevronDown className={`w-4 h-4 transition-transform`}/>
                        </button>
                        {dropdownOpen && (
                            <div className='absolute top-10 left-0 bg-[#1a1a1a] border-gray-700 rounded-lg shadow-xl py-1 min-w-[180px] z-50'>
                                {COMPETITIONS.map(c => (
                                    <button key={c.value} onClick={() => { onCompetitionChange(c.value); setDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-[#252525] transition-colors cursor-pointer ${selectedCompetition === c.value ? 'text-blue-400' : 'text-gray-200'}`}>
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/*Date strip */}
                <div className='flex items-center gap-2'>
                    <button onClick={() => shift(-1)} className='bg-[#13151a] border border-gray-700 rounded-md p-2 hover:border-gray-500 transition-colors cursor-pointer'>
                        <ChevronLeft className='w-4 h-4' />
                    </button>
                    {days.map((d, i) => (
                        <button
                            key={i}
                            onClick={() => onDateChange(formatDate(d))}
                            className={`px-4 py-2 text-sm rounded-md transition-colors cursor-pointer ${selectedDate === formatDate(d) ? 'bg-blue-500 text-white' : 'bg-[#13151a] border border-gray-700 hover:border-gray-500'}`}
                        >
                            {dayLabel(d, today)}
                        </button>
                    ))}
                    <button onClick={() => shift(1)} className='bg-[#13151a] border border-gray-700 rounded-md p-2 hover:border-gray-500 transition-colors cursor-pointer'>
                        <ChevronRight className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}