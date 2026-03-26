import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    API.post("/api/auth/login", {
      email: login.email.trim(),
      password: login.password.trim()
    })
      .then((res) => {
        const user = res.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);

        if (user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid credentials");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        value={login.email}
        onChange={(e) =>
          setLogin({ ...login, email: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        value={login.password}
        onChange={(e) =>
          setLogin({ ...login, password: e.target.value })
        }
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>

      <button
        className="btn btn-secondary mt-2"
        onClick={() => navigate("/signup")}
      >
        Go to Signup
      </button>
    </div>
  );
}
