import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ImageCarousel from "./Carousel";

const GetCars = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Image URL prefix
  const img_url = "https://yusuf098.pythonanywhere.com/static/images/";

  // Fetch products from API
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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase()) ||
    product.product_description.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <ImageCarousel />
        <div className="container">
          <h3 className="text-center mb-4 text-danger">Available Products</h3>

          {/* Search input */}
          <div className="row justify-content-center mt-3 mb-4">
            <div className="col-md-6">
              <input
                className="form-control"
                type="search"
                placeholder="Search products by name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Status messages */}
          {loading && <div className="alert alert-info text-center">{loading}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Products grid */}
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                  img_url={img_url}
                  navigate={navigate}
                />
              ))
            ) : (
              <div className="col-12 text-center">
                {search ? (
                  <p>No products match your search criteria.</p>
                ) : (
                  <p>No products available at the moment.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// ProductCard component
const ProductCard = ({ product, img_url, navigate }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <img
          src={img_url + product.product_photo}
          className="card-img-top p-3"
          alt={product.product_name}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.product_name}</h5>
          <p className="card-text text-muted flex-grow-1">
            {product.product_description}
          </p>
          <div>
            <h6 className="text-success">Price: ${product.product_cost}</h6>
            <button
              className="btn btn-danger w-100 mt-2"
              onClick={() => navigate("/mpesapayment", { state: { product } })}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCars;