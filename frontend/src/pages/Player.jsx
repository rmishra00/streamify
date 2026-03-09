import { useParams } from "react-router-dom";

function Player() {

  const { id } = useParams();

  return (

    <div>

      <h2>Movie Player</h2>

      <video width="800" controls>

        <source
          src={`http://localhost:8001/movies/${id}/stream`}
          type="video/mp4"
        />

      </video>

    </div>

  );

}

export default Player;