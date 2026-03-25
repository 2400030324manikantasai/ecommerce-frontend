import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const signup = () => {
    API.post("/api/auth/signup", user)
      .then((res) => {
        alert("Signup Successful");

        // ❌ Do NOT store user here
        // ❌ Do NOT go to dashboard

        navigate("/login"); // ✅ go to login page
      })
      .catch((err) => {
        console.log(err);
        alert("Signup failed");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>

      <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange}/>
      <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange}/>
      <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange}/>

      <button className="btn btn-primary" onClick={signup}>
        Signup
      </button>

      <button className="btn btn-secondary mb-3" onClick={() => navigate("/login")}>
        Back
      </button>
    </div>
  );
}

export default Signup;
