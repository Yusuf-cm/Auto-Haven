import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import GetCars from './components/GetCars';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddCar from './components/AddCars';
import PaymentPage from './components/PaymentPage';
import Aboutus from './components/Aboutus';
import Notfound from './components/Notfound';
import Chat from './components/Chat';
import DeleteCars from './components/DeleteCars';



function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Enhanced Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-header position-relative overflow-hidden"
      >
        <div className="hero-overlay position-absolute w-100 h-100"></div>
        <div className="container position-relative py-5">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="display-3 fw-bold text-white mb-3"
          >
            Auto Haven
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hero-subtitle lead fs-4 text-light mb-0"
          >
            Experience Automotive Excellence
          </motion.p>
        </div>
      </motion.header>

      {/* Modern Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="navbar-brand fw-bold fs-3">
              <span className="gradient-text">Auto Haven</span>
            </Link>
          </motion.div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link hover-underline">Browse Collection</Link>
              </li>
              <li className="nav-item">
                <Link to="/deletecar" className="nav-link hover-underline">Delete Your Vehicle</Link>
              </li>
              <li className="nav-item">
                <Link to="/addcar" className="nav-link hover-underline">Sell Your Vehicle</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/signup" className="nav-link btn-hover-effect">Join Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/signin" className="nav-link btn-hover-effect">Member Access</Link>
              </li>
              <li className="nav-item">
                <Link to="/chat" className="nav-link hover-underline">Chat with Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link hover-underline">Our Legacy</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

  

      {/* Animated Routes */}
   < main> <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addcar' element={<AddCar />} />
          <Route path='/deletecar' element={<DeleteCars />} />
          <Route path='/' element={<GetCars />} />
          <Route path='/paymentpage' element={<PaymentPage />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/*' element={<Notfound/>}/>
        </Routes>
      </AnimatePresence>
      </main>
     

        {/* Footer
        <footer className="gradient-footer py-5 mt-5">
        <div className="container ,text-center">
              <h5 className="text-light mb-4">Auto Haven</h5>
              <p className="text-light opacity-75">Redefining automotive excellence since 2023</p>
        </div>
      </footer> */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;