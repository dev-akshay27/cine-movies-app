import React from "react";
import { createContext, useState } from "react";

const ApiContext = createContext();
// const url ="https://api.themoviedb.org/3/movie/popular?api_key=ad1a48eb03eb6d137b07a109b40de369";

function ApiContextProvider({ children }) {
  const api_url = "https://api.themoviedb.org/3/";
  const api_key = "ad1a48eb03eb6d137b07a109b40de369";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetching movies data from API
  const fetchMovies = async () => {
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

  // Fetching Tv Shows data from API
  const fetchTvShows = async () => {
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

  return (
    <ApiContext.Provider
      value={{
        api_url,
        api_key,
        fetchMovies,
        fetchTvShows,
        data,
        loading,
        setLoading,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export { ApiContext, ApiContextProvider };
