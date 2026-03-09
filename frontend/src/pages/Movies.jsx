import { useEffect, useState } from "react";
import api from "../api/api";
import MovieCard from "../components/MovieCard";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    const res = await api.get("/movies");
    setMovies(res.data);
  };

  const handleSearch = async () => {

    if (search.trim() === "") {
      fetchMovies();
      return;
    }

    const res = await api.get(`/movies/search?query=${search}`);

    setMovies(res.data);

  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (

    <div className="min-h-screen bg-gray-900 text-white p-6">

      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold mb-6">
        🎬 Streamify Movies
      </h1>

      {/* SEARCH BAR */}

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded text-black w-64"
        />

        <button
          onClick={handleSearch}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Search
        </button>

        <button
          onClick={fetchMovies}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>

      </div>

      {/* MOVIE GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {movies.map((movie) => (

          <MovieCard
            key={movie.movieId}
            movie={movie}
          />

        ))}

      </div>

    </div>

  );
}

export default Movies;