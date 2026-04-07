import Navbar from './components/Navbar';
import HeroCard from './pages/news/components/HeroCard';
import SmallCard from './pages/news/components/SmallCard';
import { useNews } from './hooks/useNews';
import { sliceArticles } from './utils/sliceArticles';


function App() {
  const { articles, loading, error } = useNews();
  const { hero, topGrid /*midRow1*/, midRow2, bottomRow } = sliceArticles(articles);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-8">
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
            {hero && <HeroCard article={hero} />}

            {topGrid.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {topGrid.map((a, i) => <SmallCard key={i} article={a} />)}
              </div>
            )}

            {/* {midRow1.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {midRow1.map((a, i) => <HorizontalCard key={i} article={a} />)}
              </div>
            )} */}

            {midRow2.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {midRow2.map((a, i) => <SmallCard key={i} article={a} />)}
              </div>
            )}

            {bottomRow.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {bottomRow.map((a, i) => <SmallCard key={i} article={a} />)}
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  )
}

export default App
