import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      });
      setCart(data.data);
    } catch (err) {
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove single item
  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("UserToken");
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token },
      });
      fetchCart();
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  // Change quantity
  const handleUpdateQuantity = async (productId, count) => {
    if (count < 1) return;
    try {
      const token = localStorage.getItem("UserToken");
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token } }
      );
      fetchCart();
    } catch (err) {
      alert("Failed to update quantity.");
    }
  };

  // Remove all items
  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;
    try {
      const token = localStorage.getItem("UserToken");
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      });
      fetchCart();
    } catch (err) {
      alert("Failed to clear cart.");
    }
  };

  // Dispatch event to update cart/favorites badge count in header
  const dispatchCartUpdateEvent = () => {
    window.dispatchEvent(new Event("cartOrFavChanged"));
  };

  useEffect(() => {
    dispatchCartUpdateEvent();
  }, [cart]);

  if (loading) return <div className="p-10 text-center">Loading cart...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!cart || !cart.products?.length)
    return <div className="p-10 text-center">Your cart is empty.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      {/* Clear Cart button fixed inside the cart box */}
      <button
        onClick={handleClearCart}
        className="absolute top-0 left-0 mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Clear Cart
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
      <ul>
        {cart.products.map((item) => (
          <li key={item.product.id} className="flex items-center mb-4 border-b pb-2">
            <Link
              to={`/product/${item.product.id}`}
              className="flex items-center flex-1 min-w-0 group"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded mr-4 group-hover:opacity-80 transition"
              />
              <div>
                <h3 className="font-semibold group-hover:underline truncate max-w-xs">
                  {item.product.title}
                </h3>
              </div>
            </Link>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={item.count <= 1}
              >
                -
              </button>
              <span className="px-2">{item.count}</span>
              <button
                onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-600">EGP {item.price}</span>
            <button
              onClick={() => handleRemoveItem(item.product.id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              title="Remove Item"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right font-bold text-lg">
        Cart Total: <span className="text-amber-600">EGP {cart.totalCartPrice}</span>
      </div>
    </div>
  );
}

export default Cart;
