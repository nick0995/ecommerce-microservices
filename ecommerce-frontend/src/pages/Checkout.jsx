import React, { useState } from "react";

export default function Checkout({ cartItems, user }) {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:6000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        })
      });

      const data = await response.json();
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <button onClick={handleOrder} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
