import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  // Hooks to store user input and manage state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const submit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // Update the loading hook with a message
    setLoading("Hang on as we sign you in...");

    try {
      // Prepare the form data
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      // Send a POST request to the API
      const response = await axios.post("https://yusuf098.pythonanywhere.com/api/signin", data);

      if (response.data.user) {
        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // Clear loading and display an error message
        setLoading("");
        setError(response.data.message);
      }
    } catch (error) {
      // Clear loading and display the error message
      setLoading("");
      setError("Failed to sign in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5 card shadow p-4">
        <h2 className="text-center text-danger mb-4">Sign In to Auto Haven</h2>
        <form onSubmit={submit}>
          {/* Display loading or error messages */}
          {loading && <div className="alert alert-info text-center">{loading}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Email Input */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="btn btn-danger w-100">
            Sign In
          </button>
        </form>

        {/* Link to Sign Up page */}
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className="text-danger">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;