import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Player from "./pages/Player";

function App() {

  return (

    <div>

      <h1>Streamify</h1>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/player/:id" element={<Player />} />

      </Routes>

    </div>

  );

}

export default App;