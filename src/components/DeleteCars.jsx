import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "./Footer";
import ImageCarousel from "./Carousel";

const DeleteCars = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const img_url = "https://yusuf098.pythonanywhere.com/static/images/";

  const getProducts = async () => {
    setLoading("Fetching products...");
    try {
      const response = await axios.get("https://yusuf098.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError("Failed to load products.");
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
        await axios.delete(`https://yusuf098.pythonanywhere.com/api/deleteproduct/${productId}`);
      setProducts(products.filter((product) => product.product_id !== productId));
    } catch (error) {
      alert("Failed to delete. Please try again.");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase()) ||
    product.product_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="flex-grow-1">
        <ImageCarousel />
        <div className="container py-4">
          <motion.h3
            className="text-center mb-4 text-danger"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Delete Cars
          </motion.h3>

          <div className="row justify-content-center mt-3 mb-4">
            <div className="col-md-6">
              <input
                className="form-control search-input shadow-sm"
                type="search"
                placeholder="Search cars by name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading && (
            <div className="alert alert-info text-center">
              <div className="spinner-border text-primary me-2" role="status" />
              {loading}
            </div>
          )}

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  className="col-md-4 mb-4"
                  key={product.product_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card shadow-sm h-100">
                    <img
                      src={img_url + product.product_photo}
                      className="card-img-top p-3"
                      alt={product.product_name}
                      style={{ height: "200px", objectFit: "contain" }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-truncate">{product.product_name}</h5>
                      <p className="card-text text-muted flex-grow-1">
                        {product.product_description}
                      </p>
                      <h6 className="text-success fw-bold">Price: ${product.product_cost}</h6>
                      <motion.button
                        className="btn btn-outline-danger w-100 mt-3"
                        onClick={() => deleteProduct(product.product_id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <i className="bi bi-trash me-2"></i> Delete Car
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 text-center py-5 text-muted">
                {search ? "No cars match your search." : "No cars available."}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteCars;
