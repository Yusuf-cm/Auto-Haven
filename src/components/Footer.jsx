const Footer = () => {
    return (
        <div>
            <section className="row mt-4 bg-dark p-4"> {/* Changed to dark background */}
                <div className="col-md-4 text-light">
                    <h5 className="p-2 text-center text-info">About Our Dealership</h5>
                    <p>We specialize in premium pre-owned and new vehicles, offering the best selection of cars, SUVs, and trucks in the region.</p>
                    <p>Our certified technicians ensure every vehicle meets the highest standards of quality, safety, and performance before hitting our lot.</p>
                    <br/>
                </div>
                <div className="col-md-4 text-light">
                    <h5 className="p-2 text-center text-info">Contact Us</h5>
                    <input className="form-control" type="email" placeholder="Enter your email"/>
                    <br/>
                    <textarea className="form-control" rows="7" placeholder="Your message about vehicles"></textarea>
                    <br/>
                    <input type="submit" value="Send Inquiry" className="btn btn-primary"/>
                </div>
                <div className="col-md-4 text-light"> {/* Added text-light for consistency */}
                    <h4 className="text-center text-info">Connect With Us</h4>
                    <br/>
                    <div className="text-center"> {/* Centered social icons */}
                        <a href="https://facebook.com">
                            <img src="images/Facebook.png" alt="Facebook" className="socialspictures mx-2"/>
                        </a>
                        <a href="https://instagram.com">
                            <img src="images/Instagram.jpeg" alt="Instagram" className="socialspictures mx-2"/>
                        </a>
                    </div>
                    <p className="mt-3">Visit our showroom to explore our extensive inventory. We offer competitive financing options, extended warranties, and exceptional after-sales service to ensure your complete satisfaction with your vehicle purchase.</p>
                </div>
            </section>
            <footer className="bg-secondary text-white text-center p-2"> {/* Changed to bg-secondary */}
                <h5>Auto Haven &copy; {new Date().getFullYear()}. All rights reserved</h5>
            </footer>
        </div>
    );
};
 
export default Footer;