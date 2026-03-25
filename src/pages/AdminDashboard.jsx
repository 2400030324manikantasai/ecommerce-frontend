import { useEffect, useState } from "react";

function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {user ? (
        <div>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default AdminDashboard;
