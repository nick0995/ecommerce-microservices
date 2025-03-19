import React from "react";

export default function Navbar({ setSearchQuery, setShowAuthModal }) {
  return (
    <nav className="bg-yellow-500 p-4 text-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">ShopEasy</h1>
      <input
        type="text"
        placeholder="Search for products, brands, and more..."
        className="p-2 rounded text-black w-1/3"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-white text-yellow-600 p-2 rounded" onClick={() => setShowAuthModal(true)}>
        Login / Signup
      </button>
    </nav>
  );
}
