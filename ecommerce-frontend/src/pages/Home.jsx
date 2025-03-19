import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products?page=${currentPage}&category=${selectedCategory}&search=${searchQuery}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, [currentPage, searchQuery, selectedCategory]);

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} />
      <HeroSection />
      <Categories setSelectedCategory={setSelectedCategory} />
      <ProductList products={products} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Footer />
    </div>
  );
}
