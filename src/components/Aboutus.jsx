import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";

const Aboutus = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: "",
    success: ""
  });

  const teamMembers = [
    {
      name: "John Kamau",
      role: "CEO & Founder",
      bio: "20+ years in automotive industry, passionate about sustainable mobility solutions.",
      photo: "/images/team/john.jpg",
      contact: "john@autohaven.co.ke"
    },
    {
      name: "Sarah Wanjiku",
      role: "Sales Director",
      bio: "Specializes in client relationships and luxury vehicle acquisitions.",
      photo: "/images/team/sarah.jpg",
      contact: "sarah@autohaven.co.ke"
    },
    {
      name: "Michael Ochieng",
      role: "Lead Mechanic",
      bio: "ASE Certified Master Technician with 15 years experience.",
      photo: "/images/team/michael.jpg",
      contact: "michael@autohaven.co.ke"
    }
  ];

  const testimonials = [
    {
      name: "Jane Muthoni",
      role: "Business Owner",
      text: "Auto Haven helped me find the perfect SUV for my family. Their after-sales service is exceptional!",
      photo: "/images/testimonials/jane.jpg"
    },
    {
      name: "David Omondi",
      role: "Car Enthusiast",
      text: "Best place to find classic cars in Kenya. Professional staff and transparent process.",
      photo: "/images/testimonials/david.jpg"
    },
    {
      name: "Grace Atieno",
      role: "Fleet Manager",
      text: "Reliable partner for our corporate vehicle needs. Highly recommended!",
      photo: "/images/testimonials/grace.jpg"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: "", success: "" });

    try {
      await axios.post("https://yusuf098.pythonanywhere.com/api/contact", formData);
      setFormStatus({ loading: false, error: "", success: "Message sent successfully!" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setFormStatus({
        loading: false,
        success: "",
        error: error.response?.data?.message || "Failed to send message"
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero Section */}
      <section className="hero-section text-center position-relative overflow-hidden">
        <div className="gradient-overlay"></div>
        <motion.div
          className="container position-relative py-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="display-2 fw-bold mb-3 gradient-text">
            DRIVING EXCELLENCE SINCE 2010
          </h1>
          <p className="lead fs-3 text-light">Where Automotive Dreams Become Reality</p>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        className="container py-6"
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        ref={ref}
      >
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <h2 className="gradient-text mb-4">Our Journey</h2>
              <p className="lead fs-5 text-muted mb-4">
                Founded in Nairobi in 2010, Auto Haven has grown from a small showroom to 
                East Africa's premier automotive destination. We specialize in:
              </p>
              <ul className="list-group list-group-flush mb-4">
                {[
                  'Quality pre-owned vehicles',
                  'Professional vehicle inspections',
                  'Competitive financing options',
                  'Comprehensive after-sales support'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="list-group-item bg-transparent ps-0 d-flex align-items-center"
                    whileHover={{ x: 10 }}
                  >
                    <i className="bi bi-check2-circle text-gradient me-2"></i>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="stats-container glass-card p-4 rounded-4 shadow">
                {/* Optional stats content can be placed here */}
              </div>
            </motion.div>
          </div>
          <div className="col-lg-6">
            <img
              src="/images/aboutus.jpg"
              alt="Our Showroom"
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="container py-6">
        <h2 className="text-center gradient-text mb-5">Meet Our Team</h2>
        <div className="row g-4">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="col-md-4"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="card h-100 shadow">
                <img src={member.photo} className="card-img-top" alt={member.name} />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-subtitle mb-2 text-muted">{member.role}</p>
                  <p className="card-text">{member.bio}</p>
                  <p className="text-primary">{member.contact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-6">
        <h2 className="text-center gradient-text mb-5">What Our Clients Say</h2>
        <div className="row g-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="col-md-4"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="card h-100 shadow">
                <div className="card-body">
                  <p className="card-text">"{testimonial.text}"</p>
                  <div className="d-flex align-items-center mt-4">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="container py-6">
        <h2 className="text-center gradient-text mb-5">Contact Us</h2>
        <form onSubmit={handleContactSubmit} className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="col-md-12">
            <textarea
              className="form-control"
              rows="5"
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={formStatus.loading}>
              {formStatus.loading ? "Sending..." : "Send Message"}
            </button>
          </div>
          {formStatus.success && <div className="alert alert-success mt-3">{formStatus.success}</div>}
          {formStatus.error && <div className="alert alert-danger mt-3">{formStatus.error}</div>}
        </form>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Aboutus;
