import React from "react";
import "./Create.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

const Create = () => {
  return (
    <div className="pages">
      <Navbar />
      <div className="details-page">
        <div className="content-wrapper">
          <h2>Create New Freight Request</h2>
          <form className="section">
            <div className="form-field">
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="itemName"
                className="name-input"
                placeholder="Item Name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="itemDescription">Item Description</label>
              <textarea
                id="itemDescription"
                className="description-input"
                placeholder="Write a suitable description of item."
              ></textarea>
            </div>
            <div className="form-field">
              <label htmlFor="walletAddress">Wallet Address</label>
              <input
                type="text"
                id="walletAddress"
                className="name-input"
                placeholder="Wallet address"
              />
            </div>
            <div className="form-field">
              <label htmlFor="expectedDeliveryDate">Expected Delivery Date</label>
              <input type="date" id="expectedDeliveryDate" />
            </div>
            <div className="form-field">
              <label htmlFor="compensationAmount">Compensation Amount</label>
              <input
                type="text"
                id="compensationAmount"
                className="name-input"
                placeholder="Price in XDC"
              />
            </div>
            <button type="submit" className="create-button">Create Request</button>
          </form>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Create;
