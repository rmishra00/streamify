import { useEffect, useState } from "react";
import api from "../api/api";
import MovieCard from "../components/MovieCard";

function Movies() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const fetchMovies = async () => {

      const res = await api.get("/movies");

      setMovies(res.data);

    };

    fetchMovies();

  }, []);

  return (

    <div style={{ padding: "20px" }}>

      <h2>Movies</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px"
        }}
      >

        {movies.map(movie => (

          <MovieCard key={movie.movieId} movie={movie} />

        ))}

      </div>

    </div>

  );

}

export default Movies;