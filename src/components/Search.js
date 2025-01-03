import React, { useEffect, useState } from "react";
import "../swiper.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // For Font Awesome 5 or later
import { ApiContext } from "../ApiContext/ApiContext";
import { useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import noImage from "../images/no-image.jpg";

// http://localhost:3000/search.html?type=movie&search-term=The+Mummy
//https://api.themoviedb.org/3/search/tv?api_key=ad1a48eb03eb6d137b07a109b40de369&query=orphan

function Search() {
  const { api_url, api_key } = useContext(ApiContext);
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState([]);

  const fetchSearchResults = async (type, term, page) => {
    try {
      const searchUrl = `${api_url}search/${type}?api_key=${api_key}&language=en-US&query=${term}&page=${page}`;
      const response = await fetch(searchUrl);
      const searchData = await response.json();
      setData(searchData.results);
      setTotalResults(searchData.total_results);
      setTotalPages(searchData.total_pages);
    } catch (error) {
      console.log("Error while fetching search data");
    }
  };

  useEffect(() => {
    const type = searchParams.get("type");
    const term = searchParams.get("search-term");
    setSearchType(type);
    setSearchTerm(term);
    fetchSearchResults(type, term, currentPage);
  }, [searchParams, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {/* <!-- Search Results --> */}
      <section id="search-results-wrapper" className="container">
        <SearchBox />
        <h1 id="search-results-heading">
          Showing {totalResults} results for "{searchTerm}"
        </h1>
        <div id="search-results" className="grid">
          {data &&
            data.map((result, index) => {
              const isMovie = searchType === "movie";
              const detailsPath = isMovie
                ? `/movie-details/${result.id}`
                : `/shows/show-details/${result.id}`;

              return (
                <div className="card" key={index}>
                  <Link to={`${detailsPath}-details?id=${result.id}`}>
                    {result.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        className="card-img-top"
                        alt={
                          searchType === "movie" ? result.title : result.name
                        }
                      />
                    ) : (
                      <img
                        src={noImage}
                        className="card-img-top"
                        alt={
                          searchType === "movie" ? result.title : result.name
                        }
                      />
                    )}
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      {searchType === "movie" ? result.title : result.name}
                    </h5>
                    <p className="card-text">
                      <small className="text-muted">
                        Release:{" "}
                        {searchType === "movie"
                          ? result.release_date
                          : result.first_air_date}
                      </small>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div id="pagination">
          <button
            className="btn btn-primary"
            id="prev"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="btn btn-primary"
            id="next"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <div className="page-counter">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;
