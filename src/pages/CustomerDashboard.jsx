import { useEffect, useState } from "react";
import API from "../services/api";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/products") // ✅ correct
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Customer Dashboard</h2>

      <button className="btn btn-danger mb-3" onClick={logout}>
        Logout
      </button>

      <h4>Welcome: {user?.name}</h4>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerDashboard;
