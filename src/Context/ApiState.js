import ApiContext from "./ApiContext";

const ApiContext = () => {
  const [data, setData] = useState([]);
  

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






  return <ApiContext.Provider>{props.children}</ApiContext.Provider>;
};

export default ApiContext;
