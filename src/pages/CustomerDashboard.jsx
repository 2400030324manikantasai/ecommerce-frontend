import { useEffect, useState } from "react";
import API from "../services/api";

function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // ✅ FETCH PRODUCTS
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
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

      <button className="btn btn-info">Share Product</button>

      {/* USER TABLE */}
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

      {/* ✅ PRODUCTS UI */}
      <div className="row mt-4">
        {products.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card shadow mb-3">
              <img
                src={p.image_url}
                className="card-img-top"
                alt="product"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>Price: ₹{p.price}</p>
                <p>Available: {p.quantity}</p>

                <button className="btn btn-success">Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
