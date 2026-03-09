import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await api.post("/auth/login",{
        email,
        password
      });

      // save token
      localStorage.setItem("token",res.data.token);

      // go to movies page
      navigate("/movies");

    }catch(error){

      alert("Login failed");

    }

  };

  return(

    <div>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default Login;