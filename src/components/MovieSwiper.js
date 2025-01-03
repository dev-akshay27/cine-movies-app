import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Link } from "react-router-dom";
import "../swiper.css";
import { ApiContext } from "../ApiContext/ApiContext";

function MovieSwiper() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const url ="https://api.themoviedb.org/3/movie/popular?api_key=ad1a48eb03eb6d137b07a109b40de369";

  const { api_url, api_key } = useContext(ApiContext);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api_url}movie/now_playing?api_key=${api_key}`
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
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} // Use required modules
      // navigation
      // pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={20}
      slidesPerView={4}
      loop={data.length > 4}
      autoplay={{
        delay: 2000, // Time between slide transitions in milliseconds (3 seconds)
        disableOnInteraction: false, // Continue autoplay after user interaction
      }}
    >
      {data.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie-details/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={`${movie.title}`}
              />
            </Link>
            <h4 className="swiper-rating">
              <i className="fas fa-star text-secondary"></i>
              {movie.vote_average} / 10
            </h4>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default MovieSwiper;
