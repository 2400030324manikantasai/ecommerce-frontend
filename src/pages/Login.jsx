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
        console.log(err.response?.data || err);
        alert("Invalid credentials");
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#e9ecef"
      }}
    >
      <div
        style={{
          display: "flex",
          width: "750px",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)"
        }}
      >
        {/* LEFT SIDE (FORM) */}
        <div style={{ flex: 1, padding: "40px" }}>
          <h2 style={{ marginBottom: "20px" }}>Login</h2>

          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={login.email}
            onChange={(e) =>
              setLogin({ ...login, email: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
          />

          <button
            className="btn btn-primary w-100 mb-2"
            onClick={handleLogin}
          >
            Login
          </button>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div style={{ flex: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="login"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      </div>
    </div>
  );
}
