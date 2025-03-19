import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 border rounded shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-2xl font-bold text-yellow-600 mt-2">${product.price}</p>
      <button
        className="bg-yellow-500 text-white p-3 rounded mt-4 w-full"
        onClick={() => navigate("/checkout", { state: { product } })}
      >
        Buy Now
      </button>
    </div>
  );
}
