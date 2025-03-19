import React from "react";

export default function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="p-2 bg-gray-500 text-white rounded mx-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <span className="p-2">Page {currentPage}</span>
      <button
        className="p-2 bg-gray-500 text-white rounded mx-2"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
