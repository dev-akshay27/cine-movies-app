import "./App.css";
import Header from "./components/Header";
import NowPlaying from "./components/NowPlaying";
import MovieSwiper from "./components/MovieSwiper";
import SearchBox from "./components/SearchBox";
import PopularMovies from "./components/PopularMovies";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shows from "./components/TvShows";
import ShowDetails from "./components/ShowDetails";
import { ApiContextProvider } from "./ApiContext/ApiContext";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";

function App() {
  const location = useLocation();

  const hideComponents =
    location.pathname.startsWith("/movie-details/") ||
    location.pathname === "/shows" ||
    location.pathname === "/search" ||
    location.pathname.startsWith("/shows/show-details/");

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
        {!hideComponents && (
          <>
            <NowPlaying swiper={<MovieSwiper />} />
            <SearchBox />
          </>
        )}

        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/movie-details/:movieID" element={<MovieDetails />} />
          <Route path="/shows/show-details/:showID" element={<ShowDetails />} />
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
