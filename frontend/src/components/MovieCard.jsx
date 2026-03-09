import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {

  const navigate = useNavigate();

  return (

    <div
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/player/${movie.movieId}`)}
    >

      {/* Poster / Thumbnail */}
      <div className="h-64 bg-gray-800 flex items-center justify-center">

        {/* If later you add poster images you can replace this */}
        <span className="text-gray-400 text-lg">
          🎬 Poster
        </span>

      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition">

        <div className="text-white text-xl mb-2">
          ▶ Play
        </div>

        <h3 className="text-white font-semibold text-center px-2">
          {movie.title}
        </h3>

        <p className="text-gray-300 text-sm">
          {movie.genre}
        </p>

        <p className="text-yellow-400 text-sm">
          ⭐ {movie.rating}
        </p>

      </div>

    </div>

  );

}

export default MovieCard;