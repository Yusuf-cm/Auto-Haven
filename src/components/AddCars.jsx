import axios from "axios";
import { useState } from "react";

const AddCar = () => {
  // Hooks to store product details
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);

  // Hooks to manage the state of the application
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const submit = async (e) => {
    e.preventDefault(); // Prevent the site from reloading

    // Update the loading hook with a message
    setLoading("Please wait as we upload your product details...");

    // Create a FormData object to hold all the details
    const data = new FormData();
    data.append("product_name", productName);
    data.append("product_description", productDescription);
    data.append("product_cost", productCost);
    data.append("product_photo", productPhoto);

    try {
      // Send the data to the backend API
      const response = await axios.post("https://yusuf098.pythonanywhere.com/api/addproduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset loading and update the message hook
      setLoading("");
      setMessage("Product Added Successfully!");

      // Set a timeout to clear the message after 8 seconds
      const timeout = setTimeout(() => {
        setMessage("");
      }, 8000);

      // Clear the form fields
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);

      // Cleanup timeout if the component unmounts
      return () => clearTimeout(timeout);
    } catch (error) {
      setLoading("");
      setError("Failed to add the product. Please try again...");
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <form onSubmit={submit}>
          <h2 className="text-center mb-4">Add a New Product</h2>

          {/* Display loading, message, or error */}
          {loading && <div className="alert alert-info">{loading}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Product Name Input */}
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-control mb-3"
            required
          />

          {/* Product Description Input */}
          <textarea
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="form-control mb-3"
            rows="3"
            required
          />

          {/* Product Cost Input */}
          <input
            type="number"
            placeholder="Enter product price"
            value={productCost}
            onChange={(e) => setProductCost(e.target.value)}
            className="form-control mb-3"
            required
          />

          {/* Product Photo Upload */}
          <label className="form-label">Upload Product Photo</label>
          <input
            type="file"
            className="form-control mb-4"
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="btn btn-danger w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;