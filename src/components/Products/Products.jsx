import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductCard({ product, isLoggedIn }) {
  return (
    <div className="border rounded-lg shadow-md p-4 m-2 hover:shadow-2xl transition-shadow duration-200 ease-in-out">
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-lg mb-3"
      />
      <div> {/* Wrapper for text content */}
        <h3 className="text-lg font-semibold mb-1 truncate" title={product.title}>
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-md font-bold text-amber-600">
            EGP {product.price}
          </span>
          <span className="text-sm text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.ratingsAverage}
          </span>
        </div>
      </div>
      <div className="flex justify-between space-x-2 mt-auto pt-2 border-t border-gray-100"> {/* Buttons aligned to the right, added top border */}
        <button
          title={isLoggedIn ? "Add to Favorites" : "Login to add to Favorites"}
          disabled={!isLoggedIn}
          className={`p-1.5 rounded-full text-lg transition-colors duration-200
                     ${isLoggedIn ? 'text-red-500 hover:bg-red-100' : 'text-gray-400 cursor-not-allowed'}`}
        >
          <i className="fa-solid fa-heart"></i> {/* Assuming Font Awesome solid style */}
        </button>
        <button
          title={isLoggedIn ? "Add to Cart" : "Login to add to Cart"}
          disabled={!isLoggedIn}
          className={`p-1.5 rounded-full text-lg transition-colors duration-200
                     ${isLoggedIn ? 'text-blue-600 hover:bg-blue-100' : 'text-gray-400 cursor-not-allowed'}`}
        >
          <i className="fa-solid fa-cart-plus"></i> {/* Assuming Font Awesome solid style */}
        </button>
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // --- Placeholder for Authentication State ---
  // In a real app, get this from Context, Redux, or your auth hook
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate logged-out state initially
  // --- Simulate login after a delay (for demonstration) ---
  useEffect(() => {
    setTimeout(() => setIsLoggedIn(true), 5000); // Simulate login after 5 seconds
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      if (data.data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error("Fetched data is not an array:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center p-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="mx-auto py-8 w-[90%]">
      <h2 className="text-2xl font-bold text-center mb-6">Our Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoggedIn={isLoggedIn} // Pass login status down
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-10">No products found.</div>
      )}
    </div>
  );
}

export default Products;
