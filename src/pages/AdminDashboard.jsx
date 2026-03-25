import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch products
  const getProducts = () => {
    API.get("/products")   // 🔥 make sure backend endpoint is correct
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ Delete product
  const deleteProduct = (id) => {
    API.delete(`/products/${id}`)
      .then(() => {
        alert("Deleted successfully");
        getProducts(); // refresh
      })
      .catch((err) => console.log(err));
  };

  // ✅ Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <button className="btn btn-danger me-2" onClick={logout}>
        Logout
      </button>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/add-product")}
      >
        Add Product
      </button>

      {/* ✅ TABLE */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <img src={p.imageUrl} alt="" width="60" />
              </td>

              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/update-product/${p.id}`)}
                >
                  Update
                </button>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
