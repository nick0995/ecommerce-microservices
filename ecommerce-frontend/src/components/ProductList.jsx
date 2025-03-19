import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p className="text-green-500">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
