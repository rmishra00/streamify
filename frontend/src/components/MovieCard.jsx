import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {

  const navigate = useNavigate();

  return (

    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        cursor: "pointer",
        background: "#f5f5f5"
      }}
      onClick={() => navigate(`/player/${movie.movieId}`)}
    >

      <h3>{movie.title}</h3>

      <p>{movie.genre}</p>

      <p>⭐ {movie.rating}</p>

    </div>

  );
}

export default MovieCard;