import axios from "axios";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "./Footer";

const AddCar = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productCost: "",
    productPhoto: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const data = new FormData();
    data.append("product_name", formData.productName);
    data.append("product_description", formData.productDescription);
    data.append("product_cost", formData.productCost);
    data.append("product_photo", formData.productPhoto);

    try {
      await axios.post("https://yusuf098.pythonanywhere.com/api/addproduct", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });

      setMessage("Product Added Successfully!");
      setFormData({
        productName: "",
        productDescription: "",
        productCost: "",
        productPhoto: null
      });
      fileInputRef.current.value = "";
      
      setTimeout(() => setMessage(""), 8000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        className="flex-grow-1 d-flex align-items-center"
      >
        <div className="container">
          <div className="row justify-content-center">
            <motion.div
              className="col-md-8 col-lg-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="glass-card p-4 p-lg-5 rounded-4 shadow-lg">
                <motion.h2
                  className="text-center gradient-text mb-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  List New Vehicle
                </motion.h2>
  
                {loading && (
                  <div className="progress-container mb-4">
                    <div 
                      className="progress-bar-gradient" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
  
                {message && (
                  <motion.div
                    className="alert-glass success mb-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    <i className="fas fa-check-circle me-2"></i>
                    {message}
                  </motion.div>
                )}
  
                {error && (
                  <motion.div
                    className="alert-glass error mb-4"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </motion.div>
                )}
  
                <form onSubmit={submit}>
                  {[
                    { name: "productName", type: "text", label: "Vehicle Name" },
                    { name: "productDescription", type: "textarea", label: "Description" },
                    { name: "productCost", type: "number", label: "Price" },
                    { name: "productPhoto", type: "file", label: "Upload Photos" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      className="mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {field.type === "textarea" ? (
                        <motion.textarea
                          whileFocus={{ scale: 1.02 }}
                          name={field.name}
                          className="form-control-glass"
                          placeholder={`Enter ${field.label}`}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          rows="4"
                          required
                        />
                      ) : field.type === "file" ? (
                        <motion.div
                          className="file-upload-wrapper"
                          whileHover={{ scale: 1.02 }}
                        >
                          <input
                            type="file"
                            name={field.name}
                            className="form-control-glass"
                            onChange={handleInputChange}
                            accept="image/*"
                            ref={fileInputRef}
                            required
                          />
                          <div className="upload-hint mt-1">
                            <i className="fas fa-cloud-upload-alt me-2"></i>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type={field.type}
                          name={field.name}
                          className="form-control-glass"
                          placeholder={`Enter ${field.label}`}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          required
                        />
                      )}
                    </motion.div>
                  ))}
  
                  <motion.button
                    type="submit"
                    className="btn btn-gradient w-100 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Uploading...
                      </>
                    ) : (
                      "List Vehicle"
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
  
      <Footer />
    </div>
  );  
};

export default AddCar;