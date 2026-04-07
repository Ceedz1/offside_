export default function ShareIcon() {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-600 hover:text-gray-300 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            onClick={(e) => {
                e.preventDefault();
                if(navigator.share){
                    navigator.share({ url: window.location.href })
                }
            }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2MV4m0 0L8 8m40414 4" />

        </svg>
    )
}