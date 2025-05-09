import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import ImageCarousel from "./Carousel";

const GetCars = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const navigate = useNavigate();
  const img_url = "https://yusuf098.pythonanywhere.com/static/images/";

  const getProducts = async () => {
    setLoading("Please wait as we retrieve the products...");
    try {
      const response = await axios.get("https://yusuf098.pythonanywhere.com/api/getproducts");
      setProducts(response.data);
      setLoading("");
    } catch (error) {
      setLoading("");
      setError("There was an error fetching the products. Please try again later.");
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(search.toLowerCase()) ||
      product.product_description.toLowerCase().includes(search.toLowerCase())
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset page when search changes
  }, [search]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="flex-grow-1">
        <ImageCarousel />

        <div className="container py-4">
          <motion.h3
            className="text-center mb-4 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Available Products
          </motion.h3>

          {/* Search input */}
          <motion.div
            className="row justify-content-center mt-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="col-md-6">
              <div className="search-wrapper position-relative">
                <input
                  className="form-control search-input shadow-sm"
                  type="search"
                  placeholder="Search products by name or description"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bi bi-search search-icon"></i>
              </div>
            </div>
          </motion.div>

          {/* Status messages */}
          {loading && (
            <motion.div
              className="alert alert-info text-center mt-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="spinner-border text-primary me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              {loading}
            </motion.div>
          )}

          {error && (
            <motion.div
              className="alert alert-danger text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </motion.div>
          )}

          {/* Products grid */}
          <div className="row g-4 mt-3">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                  img_url={img_url}
                  navigate={navigate}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                className="col-12 text-center py-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="empty-state">
                  <i className="bi bi-search display-4 text-muted mb-3"></i>
                  <h5 className="text-muted">
                    {search
                      ? "No products match your search criteria."
                      : "No products available at the moment."}
                  </h5>
                </div>
              </motion.div>
            )}
          </div>

          {/* Pagination controls */}
          {filteredProducts.length > productsPerPage && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product, img_url, navigate, index }) => {
  return (
    <motion.div
      className="col-md-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="card shadow-sm h-100 product-card">
        <div className="card-img-container">
          <img
            src={img_url + product.product_photo}
            className="card-img-top p-3"
            alt={product.product_name}
            style={{ height: "200px", objectFit: "contain" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
          <div className="card-badge">Hot Deal</div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{product.product_name}</h5>
          <p className="card-text text-muted flex-grow-1 product-description">
            {product.product_description}
          </p>
          <div>
            <h6 className="text-success fw-bold">Price: ${product.product_cost}</h6>
            <div className="d-grid gap-2">
              <motion.button
                className="btn btn-primary"
                onClick={() => navigate("/paymentpage", { state: { product } })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="bi bi-lightning-charge-fill me-2"></i>
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        </li>
        {pages.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage && "active"}`}
          >
            <button className="page-link" onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default GetCars;
