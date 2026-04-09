import Navbar from './components/Navbar';
import News from './pages/news/News';
import { useNews } from './hooks/useNews';


function App() {
  const { loading, error } = useNews();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-425 mx-auto px-4 pt-28 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Today's News</h1>
          <p className="text-sm text-gray-400 mt-1">
            The hottest news and views from the world of football
          </p>
        </div>
        {loading && (
          <p className="text-center text-gray-500 mt-20">Loading news...</p>
        )}
        {error && (
          <p className="text-center text-red-400 mt-20">Error: {error}</p>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-4">
            <News />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
