import { useEffect } from "react";
// import './App.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../ApiContext/ApiContext";
// import { images } from "../components/images";

function PopularMovies() {
  // const url ="https://api.themoviedb.org/3/movie/popular?api_key=ad1a48eb03eb6d137b07a109b40de369";

  const { fetchInfo, data } = useContext(ApiContext); 
  console.log('object')

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
