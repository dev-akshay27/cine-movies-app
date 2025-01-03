import React, { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../ApiContext/ApiContext";
import SearchBox from "./SearchBox";
import noImage from "../images/no-image.jpg";

function Shows() {
  const { fetchTvShows, data } = useContext(ApiContext);

  useEffect(() => {
    fetchTvShows();
  }, []);

  return (
    <>
      <section className="container">
        <SearchBox />

        {/* Tv Shows  */}

        <h2>Popular TV Shows</h2>
        <div id="popular-shows" className="grid">
          {data.map((show) => {
            return (
              <div key={show.id} className="card">
                <Link to={`/shows/show-details/${show.id}`}>
                  {show.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      className="card-img-top"
                      alt={`${show.name}`}
                    />
                  ) : (
                    <img
                      src={noImage}
                      className="card-img-top"
                      alt={`${show.title}`}
                    />
                  )}
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{show.name}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      Release: {show.first_air_date}
                    </small>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Shows;
