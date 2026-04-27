import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./pages/news/News";
import NewsBarcelona from "./pages/news/NewsBarcelona";
import Matches from "./pages/matches/Matches";


// function App() {
  
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <main className="max-w-425 mx-auto px-4 pt-28 pb-8">

//         {/* General News */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-white">Today's News</h1>
//           <p className="text-[16px] text-gray-400 mt-1">
//             The hottest news and views from the world of football
//           </p>
//         </div>
//         <News />

//         {/* Barcelona Section */}
//         <div className="pt-28 mb-6">
//           <h1 className="text-2xl font-bold text-white">Blaugrana Corner</h1>
//           <p className="text-[16px] text-gray-400 mt-1">
//             By the fans, for the fans. The latest updates and deep dives into the heart of Catalonia.
//           </p>
//         </div>
//         <NewsBarcelona />

//       </main>
//     </div>
//   )
// }

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main className="max-w-425 mx-auto px-4 pt-28 pb-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Today's News</h1>
              <p className="text-[16px] text-gray-400 mt-1">
                The hottest news and views from the world of football
              </p>
            </div>
            <News />
            <div className="pt-28 mb-6">
              <h1 className="text-2xl font-bold text-white">Blaugrana Hub</h1>
              <p className="text-[16px] text-gray-400 mt-1">
                By the fans, for the fans. The latest updates and deep dives into the heart of Catalonia.
              </p>
            </div>
            <NewsBarcelona />
          </main>
        } />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </div>
  );
}

export default App
