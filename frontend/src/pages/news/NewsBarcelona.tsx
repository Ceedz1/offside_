import HeroCard from "./components/HeroCard";
import HorizontalCard from "./components/HorizontalCard";
import SmallCard from "./components/SmallCard";
import { useNewsBarcelona } from "../../hooks/useNews";
import { sliceArticles } from "../../utils/sliceArticles";

export default function News() {
    const { articles, loading, error } = useNewsBarcelona();
    const { hero, midRow1, topGrid } = sliceArticles(articles);

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading Barcelona news...</p>;
    if (error) return <p className="text-center text-red-400 mt-10">Error: {error}</p>;

    return (
        <div className="flex flex-col gap-4">
            {hero && <HeroCard article={hero} variant="barcelona"/>}

            {midRow1.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {midRow1.map((a, i) => <HorizontalCard key={i} article={a} variant="barcelona" />)}
                </div>
            )}

            {topGrid.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {topGrid.map((a, i) => <SmallCard key={i} article={a} variant="barcelona"/>)}
                </div>
            )}
        </div>
    )
}