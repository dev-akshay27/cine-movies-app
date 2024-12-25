import "./App.css";
import Header from "./components/Header";
import NowPlaying from "./components/NowPlaying";
import MovieSwiper from "./components/MovieSwiper";
import SearchBox from "./components/SearchBox";
import PopularMovies from "./components/PopularMovies";
import Footer from "./components/Footer";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Shows from "./components/TvShows";
import { useLocation } from "react-router-dom";
import { ApiContextProvider } from "./ApiContext/ApiContext";

function App() {
  const location = useLocation();

  return (
    // <div className="App">
    //   <BrowserRouter>
    //     <Header />
    //     <NowPlaying swiper={<MovieSwiper />} />
    //     <SearchBox />
    //     <Routes>
    //       <Route path="/" element={<PopularMovies />} />
    //       <Route exact path="/shows" element={<Shows />} />
    //     </Routes>
    //     <Footer />
    //   </BrowserRouter>
    // </div>
    <ApiContextProvider>
      <div className="App">
        <Header />
        {location.pathname !== "/shows" && (
          <>
            <NowPlaying swiper={<MovieSwiper />} />
            <SearchBox />
          </>
        )}

        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route exact path="/shows" element={<Shows />} />
        </Routes>
        <Footer />
      </div>
    </ApiContextProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
