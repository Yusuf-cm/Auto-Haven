import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "./Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("password", formData.password);

    try {
      const response = await axios.post("https://yusuf098.pythonanywhere.com/api/signup", form);
      setMessage(response.data.message || "Signup successful!");
      setFormData({ username: "", email: "", phone: "", password: "" });

      setTimeout(() => navigate("/signin"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
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
            <motion.div className="col-md-6 col-lg-5" whileHover={{ scale: 1.02 }}>
              <div className="glass-card p-4 p-lg-5 rounded-4 shadow-lg">
                <motion.h2
                  className="text-center gradient-text mb-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  Join Auto Haven
                </motion.h2>
  
                {loading && (
                  <motion.div
                    className="alert-glass info mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Creating your account...
                  </motion.div>
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
                    { name: "username", type: "text", label: "Username" },
                    { name: "email", type: "email", label: "Email" },
                    { name: "phone", type: "tel", label: "Phone Number" },
                    { name: "password", type: "password", label: "Password" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      className="mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type={field.type}
                        name={field.name}
                        className="form-control-glass"
                        placeholder={`Enter your ${field.label}`}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                      />
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
                        Processing...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </form>
  
                <motion.p
                  className="text-center mt-4 text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Already have an account?{" "}
                  <a href="/signin" className="hover-underline text-gradient">
                    Sign In
                  </a>
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
  
      <Footer />
    </div>
  );  
};

export default Signup;
