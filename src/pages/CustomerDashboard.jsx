import { useEffect, useState } from "react";

function CustomerDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Customer Dashboard</h2>

      <button className="btn btn-danger me-2" onClick={logout}>
        Logout
      </button>

      <button className="btn btn-info">
        Share Product
      </button>

      {user && (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerDashboard;
