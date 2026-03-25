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
    API.post("/api/auth/signup", user)   // ✅ FIXED
      .then((res) => {
        console.log(res.data);

        const newUser = res.data;

        localStorage.setItem("user", JSON.stringify(newUser)); // ✅ STORE
        localStorage.setItem("role", newUser.role);

        alert("Signup Successful");

        navigate("/customer-dashboard");
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
