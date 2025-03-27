import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetCars from './components/GetCars';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddCar from './components/AddCars';
import Mpesapayment from './components/Mpesapayment';
import Aboutus from './components/Aboutus';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  return (
    <Router>
      <div className="App text-center">
        <header className="App-header">
          <h1 className="display-4 text-light mb-4">Auto Haven</h1>
          <p className="lead text-light">Your Ultimate Destination for Luxury Cars</p>
        </header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Auto Haven</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Browse Cars</Link>
                </li>
                <li className="nav-item">
                  <Link to="/addcar" className="nav-link">Sell Your Car</Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link to="/aboutus" className="nav-link">About Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        {/* Authentication routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />

        {/* Car management routes */}
        <Route path='/addcar' element={<AddCar />} />
        <Route path='/' element={<GetCars />} /> {/* Homepage route for displaying the list of cars */}

        {/* Payment routes */}
        <Route path='/mpesapayment' element={<Mpesapayment />} />
        <Route path='/aboutus' element={<Aboutus />} />
      </Routes>
    </Router>
  );
}

export default App;
