import { useState } from "react";
import api from "../api/api";

function Admin() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [genre,setGenre] = useState("");
  const [video,setVideo] = useState(null);

  const handleCreateMovie = async () => {

    const token = localStorage.getItem("token");

    const res = await api.post(
      "/movies",
      {
        title,
        description,
        genre
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Movie created. Now upload video.");

    return res.data._id;
  };

  const handleUploadVideo = async (movieId) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("video",video);

    await api.post(
      `/movies/${movieId}/upload`,
      formData,
      {
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
      }
    );

    alert("Video uploaded successfully");
  };

  const handleSubmit = async () => {

    const movieId = await handleCreateMovie();

    await handleUploadVideo(movieId);

  };

  return(

    <div style={{padding:"20px"}}>

      <h2>Admin Upload Movie</h2>

      <input
        placeholder="Title"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Description"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Genre"
        onChange={(e)=>setGenre(e.target.value)}
      />

      <br/><br/>

      <input
        type="file"
        onChange={(e)=>setVideo(e.target.files[0])}
      />

      <br/><br/>

      <button onClick={handleSubmit}>
        Upload Movie
      </button>

    </div>

  );
}

export default Admin;