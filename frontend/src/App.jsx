import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-6xl p-8 mx-auto">

      <h1 className="mb-10 text-4xl font-bold text-center">
        Product List with AWS Lambda & DynamoDB
      </h1>

      {/* Add product button */}
      <div className="mb-8 text-center">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 text-white transition shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:scale-105"
        >
          + Add Product
        </button>
      </div>

      {/* Product list */}
      <ProductList products={products} setProducts={setProducts} />

      {/* Modal Popup */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="relative w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl animate-fadeIn">

            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute text-xl text-gray-500 top-3 right-4 hover:text-black"
            >
              ✕
            </button>

            <ProductForm
              setProducts={setProducts}
              onClose={() => setShowForm(false)}
            />

          </div>

        </div>
      )}
    </div>
  );
} 