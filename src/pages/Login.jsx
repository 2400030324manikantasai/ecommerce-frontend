
       const handleLogin = () => {
  API.post("/api/auth/login", {
    email: login.email.trim(),       // ✅ trim fix
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
