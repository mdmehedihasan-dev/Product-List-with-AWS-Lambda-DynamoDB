import { useEffect } from "react";

const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL;

export default function ProductList({ products, setProducts }) {

  const loadProducts = async () => {
    try {
      const res = await fetch(LAMBDA_URL, { method: "GET" });
      const data = await res.json();
      const items = Array.isArray(data.Items) ? data.Items : data;
      setProducts(items.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${LAMBDA_URL}?productId=${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.productId !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (!products || products.length === 0)
    return (
      <p className="mt-12 text-lg text-center text-gray-500">
        No products yet.
      </p>
    );

  return (
    <div className="grid max-w-6xl gap-8 px-4 mx-auto mt-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div
          key={p.productId}
          className="overflow-hidden transition duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
        >
          <div className="overflow-hidden">
            <img
              src={p.imageUrl}
              alt={p.title}
              className="object-cover w-full h-48 transition duration-500 group-hover:scale-110"
            />
          </div>

          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-800">
              {p.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {p.description}
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="px-3 py-1 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-green-400 to-green-600">
                ${p.price}
              </span>

              <button
                onClick={() => deleteProduct(p.productId)}
                className="px-3 py-1 text-sm text-white transition bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}