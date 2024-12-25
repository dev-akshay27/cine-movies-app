import React from "react";
import "../swiper.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // For Font Awesome 5 or later

function SearchBox() {
  return (
    <section className="search">
      <div className="container">
        <div id="alert"></div>
        <form action="/search.html" className="search-form">
          {/* <!-- movies and shows radio box --> */}
          <div className="search-radio">
            <input
              type="radio"
              id="movie"
              name="type"
              value="movie"
              checked
              readOnly
            />
            <label htmlFor="movies">Movies</label>{" "}
            {/* ToDo -- match htmlFor with ID*/}
            <input type="radio" id="tv" name="type" value="tv" />
            <label htmlFor="shows">TV Shows</label>{" "}
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
