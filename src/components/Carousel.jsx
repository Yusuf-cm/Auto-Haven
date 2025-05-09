import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";


const ImageCarousel = () => {
  const images = [
    { src: "images/prado.jpeg", title: "Luxury SUVs", subtitle: "Explore our premium collection" },
    { src: "images/supra.jpeg", title: "Sports Cars", subtitle: "Experience ultimate performance" },
    { src: "images/expe.jpeg", title: "Family Vehicles", subtitle: "Safety and comfort combined" }
  ];

  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = document.querySelector('.carousel-control-next');
      if (nextButton) nextButton.click();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="carousel-section overflow-hidden"
    >
      <div className="container-fluid px-0">
        <div 
          id="heroCarousel"
          className="carousel slide carousel-fade shadow-lg" 
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded-4 overflow-hidden">
            {images.map((img, index) => (
              <div 
                key={index}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                data-bs-interval="5000"
              >
                <div className="carousel-image-container">
                  <img 
                    src={img.src}
                    alt={img.title}
                    className="d-block w-100 object-cover"
                    style={{ height: "80vh", filter: "brightness(0.8)" }}
                    loading="lazy"
                  />
                  <div className="carousel-gradient-overlay"></div>
                </div>
                
                <motion.div 
                  className="carousel-caption d-flex flex-column justify-content-center align-items-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.h2 
                    className="display-3 fw-bold mb-3 text-shadow text-center"
                    initial={{ letterSpacing: "2px" }}
                    animate={{ letterSpacing: "0px" }}
                    transition={{ duration: 1 }}
                  >
                    {img.title}
                  </motion.h2>
                  <motion.p 
                    className="lead fs-2 mb-4 text-shadow text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {img.subtitle}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-lg btn-glow"
                    style={{
                      background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                      border: "none",
                      padding: "1rem 2rem",
                      borderRadius: "50px"
                    }}
                  >
                    Explore Collection
                  </motion.button>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <Link 
            to="#heroCarousel"
            className="carousel-control-prev" 
            role="button" 
            data-bs-slide="prev"
          >
            <span 
              className="carousel-control-prev-icon bg-dark rounded-circle p-3"
              aria-hidden="true"
            ></span>
          </Link>
          <Link 
            to="#heroCarousel"
            className="carousel-control-next" 
            role="button" 
            data-bs-slide="next"
          >
            <span 
              className="carousel-control-next-icon bg-dark rounded-circle p-3"
              aria-hidden="true"
            ></span>
          </Link>

          {/* Indicators */}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <motion.button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "2px solid white"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ImageCarousel;
