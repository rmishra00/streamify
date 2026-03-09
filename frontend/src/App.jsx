import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Player from "./pages/Player";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const token = localStorage.getItem("token");

  return (

    <div>

      {token && <Navbar />}

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/player/:id"
          element={
            <ProtectedRoute>
              <Player />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>

  );
}

export default App;