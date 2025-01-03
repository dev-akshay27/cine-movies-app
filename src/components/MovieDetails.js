import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { ApiContext } from "../ApiContext/ApiContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import noImage from "../images/no-image.jpg"

function MovieDetails() {
  const { api_url, api_key, loading, setLoading } = useContext(ApiContext);

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const { movieID } = useParams();
  const [data, setData] = useState([]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `${api_url}movie/${movieID}?api_key=${api_key}`
      );
      const movieData = await response.json();
      setData(movieData);
    } catch (error) {
      console.error("Error fetching movie details", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <section className="container">
      <div className="back">
        <Link className="btn" to="/">
          Back To Movies
        </Link>
      </div>

      {/* <!-- Movie Details Output --> */}
      <div id="movie-details">
        <div className="details-top">
          <div>
            {data.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                className="card-img-top"
                alt={data.title}
              />
            ) : (
              <img
              src={noImage}
                className="card-img-top"
                alt={data.title}
              />
            )}
          </div>
          <div>
            <h2>{data.title}</h2>
            <p>
              <i className="fas fa-star text-primary"></i>
              {data.vote_average?.toFixed(1)} / 10
            </p>
            <p className="text-muted">Release Date: {data.release_date}</p>
            <p>{data.overview}</p>
            <h5>Genres</h5>
            <ul className="list-group">
              {data.genres &&
                data.genres.map((elem, index) => (
                  <p key={index}>{elem.name}</p>
                ))}
            </ul>
            <Link to="/" target="_blank" className="btn">
              Visit Movie Homepage
            </Link>
          </div>
        </div>
        <div className="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li>
              <span className="text-secondary">Budget:</span>$
              {data.budget ? formatNumberWithCommas(data.budget) : "N/A"}
            </li>
            <li>
              <span className="text-secondary">Revenue:</span>$
              {data.revenue ? formatNumberWithCommas(data.revenue) : "N/A"}
            </li>
            <li>
              <span className="text-secondary">Runtime:</span> {data.runtime}
            </li>
            <li>
              <span className="text-secondary">Status:</span> {data.status}
            </li>
          </ul>
          <h4>Production Companies</h4>
          <div className="list-group">
            {data.production_companies &&
              data.production_companies.map((company, index) => (
                <p key={index}>{company.name}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
