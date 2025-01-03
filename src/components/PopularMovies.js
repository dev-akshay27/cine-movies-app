import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../ApiContext/ApiContext";
import noImage from "../images/no-image.jpg"

// import { images } from "../components/images";

function PopularMovies() {
  const { fetchMovies, data } = useContext(ApiContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section className="container">
      <h2>Popular Movies</h2>

      <div className="grid">
        {data.map((movie) => {
          return (
            <div key={movie.id} className="card">
              <Link to={`/movie-details/${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={`${movie.title}`}
                  />
                ) : (
                  <img
                  src={noImage}
                    className="card-img-top"
                    alt={`${movie.title}`}
                  />
                )}
              </Link>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  <small className="text-muted">
                    Release: {movie.release_date}
                  </small>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PopularMovies;
