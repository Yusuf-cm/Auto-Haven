import React from "react";
import { Link } from "react-router-dom";

const Aboutus = () => {
    const teamMembers = [
        {
            name: "John Kamau",
            role: "CEO & Founder",
            bio: "20+ years in automotive industry. Passionate about quality vehicles.",
            contact: "john@autohaven.com",
            photo: "images/team/ceo.jpg"
        },
        {
            name: "Sarah Wanjiku",
            role: "Sales Director",
            bio: "Helping clients find their perfect vehicle since 2015.",
            contact: "sarah@autohaven.com",
            photo: "images/team/sales.jpg"
        },
        {
            name: "David Ochieng",
            role: "Lead Technician",
            bio: "Certified master mechanic ensuring every car meets our standards.",
            contact: "david@autohaven.com",
            photo: "images/team/tech.jpg"
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4 fw-bold">DRIVING EXCELLENCE SINCE 2010</h1>
                    <p className="lead">Your trusted partner in premium vehicle acquisition</p>
                </div>
            </section>

            {/* About Section */}
            <section className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h2 className="text-danger mb-4">Our Story</h2>
                        <p className="lead">Founded in 2010, Auto Haven has grown from a small showroom to Nairobi's premier automotive destination.</p>
                        <p>We've served over 5,000 satisfied customers with our commitment to transparency, quality, and exceptional service.</p>
                        <div className="stats-container mt-4 p-4 bg-light rounded">
                            <div className="row text-center">
                                <div className="col-md-4 mb-3">
                                    <h3 className="text-danger">5000+</h3>
                                    <p>Happy Customers</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <h3 className="text-danger">200+</h3>
                                    <p>Vehicles in Stock</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <h3 className="text-danger">12</h3>
                                    <p>Awards Won</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img 
                            src="images/showroom.jpg" 
                            alt="Auto Haven Showroom" 
                            className="img-fluid rounded shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center text-danger mb-5">Meet Our Team</h2>
                    <div className="row">
                        {teamMembers.map((member, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card team-card h-100 border-0 shadow">
                                    <img 
                                        src={member.photo} 
                                        className="card-img-top" 
                                        alt={member.name}
                                        onError={(e) => e.target.src = "images/team/default.jpg"}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{member.name}</h5>
                                        <p className="text-danger">{member.role}</p>
                                        <p className="card-text">{member.bio}</p>
                                        <a href={`mailto:${member.contact}`} className="btn btn-sm btn-outline-danger">
                                            Contact {member.name.split(' ')[0]}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="container py-5">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <h2 className="text-danger mb-4">Visit Us</h2>
                        <div className="map-container mb-4">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808206575987!2d36.82115931475398!3d-1.292335835980772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d664f5b7c9%3A0x1d3f1a3a3b5b5b5b!2sAuto%20Haven!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                                width="100%" 
                                height="300" 
                                style={{border:0}} 
                                allowFullScreen="" 
                                loading="lazy"
                                title="Auto Haven Location"
                            ></iframe>
                        </div>
                        <address>
                            <strong>Auto Haven</strong><br/>
                            ABC Place, Waiyaki Way<br/>
                            Nairobi, Kenya<br/>
                            <i className="bi bi-phone me-2"></i> +254 700 123 456<br/>
                            <i className="bi bi-envelope me-2"></i> info@autohaven.com
                        </address>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <h2 className="text-danger mb-4">Send Us a Message</h2>
                        <form className="contact-form">
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Your Name" required/>
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Your Email" required/>
                            </div>
                            <div className="mb-3">
                                <input type="tel" className="form-control" placeholder="Phone Number"/>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-dark text-white py-5">
                <div className="container">
                    <h2 className="text-center text-info mb-5">What Our Customers Say</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="testimonial-card p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="images/customers/jane.jpg" alt="Jane" className="rounded-circle me-3" width="60"/>
                                    <div>
                                        <h5 className="mb-0">Jane Muthoni</h5>
                                        <small>Business Owner</small>
                                    </div>
                                </div>
                                <p>"Auto Haven helped me find the perfect SUV for my family. Their after-sales service is exceptional!"</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="testimonial-card p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="images/customers/mike.jpg" alt="Mike" className="rounded-circle me-3" width="60"/>
                                    <div>
                                        <h5 className="mb-0">Mike Otieno</h5>
                                        <small>Corporate Executive</small>
                                    </div>
                                </div>
                                <p>"The most transparent car buying experience I've ever had. Will definitely recommend to friends!"</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="testimonial-card p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <img src="images/customers/grace.jpg" alt="Grace" className="rounded-circle me-3" width="60"/>
                                    <div>
                                        <h5 className="mb-0">Grace Wambui</h5>
                                        <small>Entrepreneur</small>
                                    </div>
                                </div>
                                <p>"Found my dream car at a great price. The financing options made it so affordable!"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-danger text-white py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/" className="text-white">Home</Link></li>
                                <li><Link to="/" className="text-white">Sell Car</Link></li>
                                <li><Link to="/about" className="text-white">About Us</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <h5>Business Hours</h5>
                            <ul className="list-unstyled">
                                <li>Monday-Friday: 8:00 AM - 6:00 PM</li>
                                <li>Saturday: 9:00 AM - 4:00 PM</li>
                                <li>Sunday: Closed</li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Connect With Us</h5>
                            <div className="social-icons">
                                <a href="https://facebook.com" className="text-white me-3">
                                    <i className="bi bi-facebook fs-4"></i>
                                </a>
                                <a href="https://instagram.com" className="text-white me-3">
                                    <i className="bi bi-instagram fs-4"></i>
                                </a>
                                <a href="https://twitter.com" className="text-white">
                                    <i className="bi bi-twitter-x fs-4"></i>
                                </a>
                            </div>
                            <div className="mt-3">
                                <Link to="/contact" className="btn btn-light btn-sm">Schedule Test Drive</Link>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 bg-white"/>
                    <div className="text-center">
                        <p className="mb-0">Auto Haven &copy; {new Date().getFullYear()}. All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Aboutus;