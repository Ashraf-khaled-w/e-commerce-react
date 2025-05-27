import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        setProduct(data.data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    window.dispatchEvent(new Event("cartOrFavChanged"));
  }, [product]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        &larr; Back to Home
      </button>
      <div className="max-w-2xl mx-auto p-6">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-80 object-cover rounded mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="mb-2 text-gray-700">{product.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-amber-600">EGP {product.price}</span>
          <span className="text-sm text-gray-700">Rating: {product.ratingsAverage}</span>
        </div>
        <p className="text-sm text-gray-500">Category: {product.category?.name}</p>
      </div>
    </div>
  );
}

export default ProductPage;
