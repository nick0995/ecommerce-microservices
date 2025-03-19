import React from "react";

export default function Categories({ setSelectedCategory }) {
  const categories = ["All", "Electronics", "Fashion", "Books", "Home & Kitchen", "Toys & Games"];
  return (
    <div className="flex space-x-4 mb-4 bg-white p-4 shadow-lg rounded">
      {categories.map((category) => (
        <button
          key={category}
          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
