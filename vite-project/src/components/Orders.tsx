import React, { useState } from "react";
import "./Order.css";
import axios from "axios";

const Orders: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const initialName = queryParams.get("name");
  const initialPrice = queryParams.get("price");
  const initialDescription = queryParams.get("description");

  const initialState = {
    quantity: 1,
    saved: false,
  };

  const [order, setOrder] = useState(initialState);
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState(""); //

  const handleDecrease = () => {
    if (order.quantity > 1) {
      setOrder((prevState) => ({ ...prevState, quantity: prevState.quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    setOrder((prevState) => ({ ...prevState, quantity: prevState.quantity + 1 }));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setOrder((prevState) => ({ ...prevState, quantity: newQuantity }));
    }
  };

  
  const handleSave = async () => {
    try {
      // Example API request with full URL
    const response = await axios.post("http://localhost:8080/api/orders", {
    name,
    price,
    description,
    quantity,
    });


      if (response.status === 201) {
        setOrderId(response.data._id); // Set the orderId after saving
        setOrder((prevState) => ({ ...prevState, saved: true }));
        setMessage("Order confirmed!. Delivering product within 40-45 min.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`); // Use the correct order ID
      setOrder(initialState);
      setName("");
      setPrice("");
      setDescription("");
      setMessage("Order Canceled successfully.");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  


  const { quantity, saved } = order;

  return (
    <div className="order-container">
      <h2 className="hj">Order Details</h2>
      <div className="order-item">
        <div className="order-info">
          
          <p>Name: {name}</p>
          <p>Price: ${price}</p>
          <p>Description: {description}</p>
        </div>
        <div className="order-quantity">
          <button onClick={handleDecrease}>-</button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={handleIncrease}>+</button>
        </div>
        <div className="order-actions">
          {!saved && <button onClick={handleSave} className="ko">Confirm Order</button>}
          <button onClick={handleDelete} className="ko">Cancel Order</button>
        </div>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Orders;
