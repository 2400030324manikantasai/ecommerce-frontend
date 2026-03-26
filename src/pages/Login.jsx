import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    try {
      const res = await API.post("/auth/login", user); // ✅ FIXED

      // ✅ store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful");
      navigate("/customer-dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control mb-2"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={login}>
        Login
      </button>

      <button
        className="btn btn-secondary mt-2"
        onClick={() => navigate("/signup")}
      >
        Signup
      </button>
    </div>
  );
}

export default Login;
  
            
              
