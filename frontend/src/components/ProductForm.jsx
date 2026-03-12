import { useState } from "react";

const LAMBDA_URL = import.meta.env.VITE_LAMBDA_URL;

export default function ProductForm({ setProducts, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) })
      });

      const newProduct = await res.json();
      setProducts(prev => [newProduct, ...prev]); // add new product to top
      setForm({ title: "", description: "", price: "", imageUrl: "" }); // reset form
      onClose(); // hide form after save
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-5 mx-auto mb-6 bg-white shadow-md rounded-xl">
      <h2 className="mb-4 text-xl font-bold">Add New Product</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="text"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 mb-3 border rounded"
      />

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 transition bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
