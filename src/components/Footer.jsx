import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      ref={ref}
    >
      <section className="row mt-4 p-4 glass-footer">
        {/* About Column */}
        <motion.div 
          className="col-md-4 text-light p-4"
          initial={{ x: -50 }}
          animate={{ x: inView ? 0 : -50 }}
          transition={{ delay: 0.2 }}
        >
          <h5 className="p-2 text-center gradient-text">About Our Dealership</h5>
          <p className="lead fs-6 opacity-75">We specialize in premium pre-owned and new vehicles, offering the best selection of cars, SUVs, and trucks in the region.</p>
          <p className="lead fs-6 opacity-75">Our certified technicians ensure every vehicle meets the highest standards of quality, safety, and performance before hitting our lot.</p>
        </motion.div>

        {/* Contact Column */}
        <motion.div 
          className="col-md-4 text-light p-4"
          initial={{ y: 50 }}
          animate={{ y: inView ? 0 : 50 }}
          transition={{ delay: 0.4 }}
        >
          <h5 className="p-2 text-center gradient-text">Contact Us</h5>
          <motion.input 
            whileFocus={{ scale: 1.05 }}
            className="form-control glass-input mb-3"
            type="email" 
            placeholder="Enter your email"
          />
          <motion.textarea 
            whileFocus={{ scale: 1.05 }}
            className="form-control glass-input mb-3"
            rows="5" 
            placeholder="Your message about vehicles"
          />
          <motion.input 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            value="Send Inquiry" 
            className="btn btn-gradient w-100"
          />
        </motion.div>

        {/* Connect Column */}
        <motion.div 
          className="col-md-4 text-light p-4"
          initial={{ x: 50 }}
          animate={{ x: inView ? 0 : 50 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-center gradient-text mb-4">Connect With Us</h4>
          <div className="d-flex justify-content-center gap-3 mb-4">
            <motion.a 
              whileHover={{ y: -5 }}
              href="https://facebook.com"
            >
              <img 
                src="images/Facebook.png" 
                alt="Facebook" 
                className="social-icon rounded-circle"
              />
            </motion.a>
            <motion.a 
              whileHover={{ y: -5 }}
              href="https://instagram.com"
            >
              <img 
                src="images/Instagram.jpeg" 
                alt="Instagram" 
                className="social-icon rounded-circle"
              />
            </motion.a>
          </div>
          <p className="lead fs-6 opacity-75 text-center">Visit our showroom to explore our extensive inventory. We offer competitive financing options and exceptional after-sales service.</p>
        </motion.div>
      </section>

      <motion.footer 
        className="gradient-footer text-center p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 0.8 }}
      >
        <h5 className="mb-0">
          Auto Haven © {new Date().getFullYear()}. All rights reserved
        </h5>
      </motion.footer>
    </motion.div>
  );
};

export default Footer;