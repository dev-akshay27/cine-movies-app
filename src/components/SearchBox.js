import React, { useState } from "react";
import "../swiper.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // For Font Awesome 5 or later

function SearchBox() {
  // http://localhost:3000/search.html?type=movie&search-term=The+Mummy

  const [searchType, setSearchType] = useState("movie");

  const handleRadioChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <section className="search">
      <div className="container">
        <div id="alert"></div>
        <form action="/search" className="search-form">
          {/* <!-- movies and shows radio box --> */}
          <div className="search-radio">
            <input
              type="radio"
              id="movie"
              name="type"
              value="movie"
              checked={(searchType === "movie")}
              readOnly
              onChange={handleRadioChange}
            />
            <label htmlFor="movie">Movies</label>{" "}
            {/* ToDo -- match htmlFor with ID*/}
            <input
              type="radio"
              id="tv"
              name="type"
              value="tv"
              checked={(searchType === "tv")}
              onChange={handleRadioChange}
            />
            <label htmlFor="tv">TV Shows</label>{" "}
            {/* ToDo -- match htmlFor with ID*/}
          </div>
          <div className="search-flex">
            <input
              type="text"
              name="search-term"
              id="search-term"
              placeholder="Enter search term"
            />
            <button className="btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchBox;
