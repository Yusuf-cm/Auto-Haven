import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Mpesapayment = () => {
    const { car } = useLocation().state || {}; // Changed from `product` to `car`

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setMessage("Processing your payment, please wait...");

        const data = new FormData();
        data.append("phone", phone);
        data.append("amount", car.car_price); // Changed from `product_cost` to `car_price`

        try {
            const response = await axios.post("https://yusuf098.pythonanywhere.com/api/mpesa_payment", data);
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Payment failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h1 className="text-center text-danger mb-4">Lipa na M-Pesa</h1>
                        {message && (
                            <div className="alert alert-info text-center" role="alert">
                                {message}
                            </div>
                        )}
                        <h4 className="text-center mb-4">
                            Car Name: <span className="text-danger">{car.car_name}</span> {/* Changed from `product_name` to `car_name` */}
                        </h4>
                        <form onSubmit={submit}>
                            <div className="mb-3">
                                <h5>
                                    Price: <span className="text-danger">Ksh {car.car_price}</span> {/* Changed from `product_cost` to `car_price` */}
                                </h5>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label fw-bold">
                                    Enter your M-Pesa Number
                                </label>
                                <input
                                    type="number"
                                    id="phone"
                                    placeholder="Enter your M-Pesa number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-danger">
                                    Make Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Mpesapayment.propTypes = {
    car: PropTypes.shape({
        car_name: PropTypes.string.isRequired, // Changed from `product_name` to `car_name`
        car_price: PropTypes.number.isRequired, // Changed from `product_cost` to `car_price`
    }),
};

export default Mpesapayment;