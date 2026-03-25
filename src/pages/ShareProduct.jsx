import { useState } from "react";
import axios from "axios";

function ShareProduct() {

  const [email, setEmail] = useState("");

  const shareProduct = async () => {
    try {
      const subject = "Check out these products!";
      const text = "Visit our Ecommerce site to explore amazing products.";

      const response = await axios.get(
        `http://localhost:8082/mail/send?to=${email}&subject=${encodeURIComponent(subject)}&text=${encodeURIComponent(text)}`
      );

      alert(response.data);

    } catch (error) {
      alert("Error sending mail");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Share Products</h3>

      <input
        type="email"
        placeholder="Enter recipient email"
        className="form-control mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-primary" onClick={shareProduct}>
        Send
      </button>
    </div>
  );
}

export default ShareProduct;