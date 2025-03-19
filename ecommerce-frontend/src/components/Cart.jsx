import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? <p>Cart is empty</p> : (
        cartItems.map((item) => (
          <div key={item.productId} className="flex justify-between border-b py-2">
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <button className="text-red-500" onClick={() => dispatch(removeItem(item.productId))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
