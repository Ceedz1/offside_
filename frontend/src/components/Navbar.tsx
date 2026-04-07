import { useState } from 'react';
import navLogo from '../assets/navLogo.png'

const navLinks = [
    { label: "Matches", href: "#", dropdown: false },
    { label: "Teams", href: "#", dropdown: true },
    { label: "Competitions", href: "#", dropdown: true },
];

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <div className='fixed bg-[#0B0D11] border-b-4 border-blue-700 px-6 py-3 pl-50 flex items-center gap-8 w-full'>
            <img src={navLogo} alt="Offside Logo" className='h-7.5' />
            <div className="flex items-center font-bold gap-6 ml-4">
                {navLinks.map((link) => (
                <div key={link.label} className="relative">
                    <button
                    className="flex items-center gap-1 text-sm text-gray-200 hover:text-white transition-colors"
                    onClick={() =>
                        setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                        )
                    }
                    >
                    {link.label}
                    {link.dropdown && (
                        <svg
                        className={`w-3 h-3 transition-transform ${
                            openDropdown === link.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                        </svg>
                    )}
                    </button>

                    {/* Dropdown placeholder */}
                    {link.dropdown && openDropdown === link.label && (
                    <div className="absolute top-8 left-0 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl py-2 min-w-[160px] z-50">
                        <p className="px-4 py-2 text-xs text-gray-500">Coming soon</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}