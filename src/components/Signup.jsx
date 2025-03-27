import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // Hooks to store user input and manage state
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const submit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // Update the loading hook with a message
    setLoading("Please wait as we create your account...");

    try {
      // Prepare the form data
      const data = new FormData();
      data.append("first_name", first_name);
      data.append("last_name", last_name);
      data.append("email", email);
      data.append("phone_number", phone_number);
      data.append("password", password);

      // Send a POST request to the API
      const response = await axios.post("https://yusuf098.pythonanywhere.com/api/signup", data);

      // Clear loading and error hooks
      setLoading("");
      setError("");

      // Update the success hook with the response message
      setSuccess(response.data.message);

      // Clear the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");

      // Redirect to the Sign In page after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      // Clear loading and display the error message
      setLoading("");
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 card shadow p-4">
        <h2 className="text-center text-danger mb-4">Sign Up for Auto Haven</h2>
        <form onSubmit={submit}>
          {/* Display loading, success, or error messages */}
          {loading && <div className="alert alert-info text-center">{loading}</div>}
          {success && <div className="alert alert-success text-center">{success}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* First Name Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your first name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          {/* Last Name Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Phone Number Input */}
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Enter your phone number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            Sign Up
          </button>
        </form>

        {/* Link to Sign In page */}
        <p className="text-center mt-3">
          Already have an account? <Link to="/signin" className="text-danger">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;