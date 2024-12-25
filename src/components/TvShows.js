import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

function Shows() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const url ="https://api.themoviedb.org/3/movie/popular?api_key=ad1a48eb03eb6d137b07a109b40de369";

  const api_url = "https://api.themoviedb.org/3/";
  const api_key = "ad1a48eb03eb6d137b07a109b40de369";

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api_url}tv/popular?api_key=${api_key}`);
      const data = await response.json();
      setData(data.results);
    } catch (error) {
      console.error("Error fetching popular tv shows", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      {/* <h1>Shows</h1> */}

      <section className="container">
        <SearchBox/>
        <h2>Popular TV Shows</h2>
        <div id="popular-shows" className="grid">
          {data.map((show) => {
            return (
              <div key={show.id} className="card">
                <Link to={`movie-details.html?id=${show.id}`}>
                  {show.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      className="card-img-top"
                      alt={`${show.title}`}
                    />
                  ) : (
                    <img
                      src={` "/images/no-image.jpg"${show.poster_path}`}
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
