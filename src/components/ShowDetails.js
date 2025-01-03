import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { ApiContext } from "../ApiContext/ApiContext";
import { Link, useParams } from "react-router-dom";
import noImage from "../images/no-image.jpg";

function ShowDetails() {
  const { api_key, api_url, loading, setLoading } = useContext(ApiContext);

  const { showID } = useParams();
  const [data, setData] = useState([]);

  const fetchShowDetails = async () => {
    try {
      const response = await fetch(`${api_url}tv/${showID}?api_key=${api_key}`);
      const showData = await response.json();

      setData(showData);
    } catch (error) {
      console.error("Error fetching show details", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShowDetails();
  }, []);

  return (
    <section className="container">
      <div className="back">
        <Link className="btn" to="/">
          Back To Shows
        </Link>
      </div>

      {/* <!-- Show Details Output --> */}
      <div id="show-details">
        <div className="details-top">
          <div>
            {data.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                className="card-img-top"
                alt={data.title}
              />
            ) : (
              <img src={noImage} className="card-img-top" alt={data.title} />
            )}
          </div>
          <div>
            <h2>{data.name}</h2>
            <p>
              <i className="fas fa-star text-primary"></i>
              {data.vote_average?.toFixed(1)} / 10
            </p>
            <p className="text-muted">Last Air Date: {data.last_air_date}</p>
            <p>{data.overview}</p>
            <h5>Genres</h5>
            <ul className="list-group">
              {data.genres &&
                data.genres.map((elem, id) => <p key={id}>{elem.name}</p>)}
            </ul>
            <Link to="/" className="btn">
              Visit Movie Homepage
            </Link>
          </div>
        </div>
        <div className="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li>
              <span className="text-secondary">Numbers of Episodes:</span>
              {data.number_of_episodes}
            </li>
            <li>
              <span className="text-secondary">Last Episode to Air:</span>
              {data.last_episode_to_air ? data.last_episode_to_air.name : "N/A"}
            </li>

            <li>
              <span className="text-secondary">Status:</span> {data.status}
            </li>
          </ul>
          <h4>Production Companies</h4>
          <div className="list-group">
            {data.production_companies &&
              data.production_companies.map((company, id) => (
                <p key={id}>{company.name}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowDetails;
