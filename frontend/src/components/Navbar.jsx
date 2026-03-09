import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">

      <h1 className="text-xl font-bold">🎬 Streamify</h1>

      <div className="space-x-6">

        <Link to="/movies" className="hover:text-red-400">
          Movies
        </Link>

        <Link to="/admin" className="hover:text-red-400">
          Admin
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;