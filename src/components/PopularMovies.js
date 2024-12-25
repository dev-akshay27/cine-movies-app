import { useState, useEffect } from "react";
// import './App.css';
import { Link } from "react-router-dom";
// import { images } from "../components/images";

function PopularMovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const url ="https://api.themoviedb.org/3/movie/popular?api_key=ad1a48eb03eb6d137b07a109b40de369";

  const api_url = "https://api.themoviedb.org/3/";
  const api_key = "ad1a48eb03eb6d137b07a109b40de369";

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api_url}movie/popular?api_key=${api_key}`
      );
      const data = await response.json();
      setData(data.results);
    } catch (error) {
      console.error("Error fetching popular movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <section className="container">
      <h2>Popular Movies</h2>

      <div className="grid">
        {data.map((movie) => {
          // console.log(movie.title);
          return (
            <div key={movie.id} className="card">
              <Link to={`movie-details.html?id=${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={`${movie.title}`}
                  />
                ) : (
                  <img
                    src={` "/images/no-image.jpg"${movie.poster_path}`}
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
