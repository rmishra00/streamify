import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await api.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      navigate("/movies");

    } catch (error) {

      alert("Login failed");

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-900">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🎬 Streamify Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;