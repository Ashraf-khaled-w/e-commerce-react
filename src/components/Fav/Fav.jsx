import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Fav() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("UserToken");
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      setWishlist(data.data);
    } catch (err) {
      setError("Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove single item from wishlist
  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("UserToken");
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token },
      });
      fetchWishlist();
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  // Remove all items from wishlist
  const handleClearWishlist = async () => {
    if (!window.confirm("Are you sure you want to clear your favorites?")) return;
    try {
      const token = localStorage.getItem("UserToken");
      // Remove all by removing each item (API does not provide a clear-all endpoint)
      await Promise.all(
        wishlist.map((item) =>
          axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${item.id}`, {
            headers: { token },
          })
        )
      );
      fetchWishlist();
    } catch (err) {
      alert("Failed to clear favorites.");
    }
  };

  // Dispatch event to update cart or favorites badge
  const dispatchUpdateEvent = () => {
    window.dispatchEvent(new Event("cartOrFavChanged"));
  };

  useEffect(() => {
    dispatchUpdateEvent();
  }, [wishlist]);

  if (loading) return <div className="p-10 text-center">Loading favorites...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!wishlist.length)
    return <div className="p-10 text-center">Your favorites list is empty.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      {/* Clear Favorites button fixed inside the box */}
      <button
        onClick={handleClearWishlist}
        className="absolute top-0 left-0 mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Clear Favorites
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Your Favorites</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id} className="flex items-center mb-4 border-b pb-2">
            <Link
              to={`/product/${item.id}`}
              className="flex items-center flex-1 min-w-0 group"
            >
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-16 h-16 object-cover rounded mr-4 group-hover:opacity-80 transition"
              />
              <div>
                <h3 className="font-semibold group-hover:underline truncate max-w-xs">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">Price: EGP {item.price}</p>
              </div>
            </Link>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              title="Remove from Favorites"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fav;
