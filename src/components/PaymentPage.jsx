import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
    const { product } = useLocation().state || {};

    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("mpesa");

    const handlePayment = async (e) => {
        e.preventDefault();
        setMessage("Processing your payment, please wait...");

        const data = new FormData();
        data.append("amount", product.product_price);

        let endpoint = "";

        if (paymentMethod === "mpesa") {
            data.append("phone", phone);
            endpoint = "https://yusuf098.pythonanywhere.com/api/mpesa_payment";
        } 
        // You can add more conditions for other methods
        // else if (paymentMethod === "card") {
        //     endpoint = "https://yourapi.com/api/card_payment";
        // }

        try {
            const response = await axios.post(endpoint, data);
            setMessage(response.data.message || "Payment completed.");
        } catch (error) {
            setMessage("Payment failed. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center text-primary mb-3">Choose Payment Method</h2>
                        
                        <select
                            className="form-select mb-4"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="mpesa">M-Pesa</option>
                            {/* <option value="card">Card</option>
                            <option value="bank">Bank Transfer</option> */}
                        </select>

                        {message && (
                            <div className="alert alert-info text-center" role="alert">
                                {message}
                            </div>
                        )}

                        <h4 className="text-center mb-3">
                            Car: <span className="text-danger">{product?.product_name}</span>
                        </h4>
                        <h5 className="text-center mb-4">
                            Price: <span className="text-success"> ${product.product_cost}</span>
                        </h5>

                        <form onSubmit={handlePayment}>
                            {paymentMethod === "mpesa" && (
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
                            )}

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
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

export default PaymentPage;
