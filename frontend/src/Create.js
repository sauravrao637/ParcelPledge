import React, { useState } from "react";

import "./Create.css";

import { addrParcel, CHAIN_PARAMS, DEFAULT_USER_TYPE, TYPE_SHIPPER, TYPE_PARTNER, TYPE_OWNER } from './utils';

const Create = ({ connectedAddress, myType, shipOrder, getParcel }) => {
  const [itemName, setItemName] = useState('')
  const [itemDesc, setItemDesc] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [expectedDelivery, setExpectedDeliverey] = useState('');
  const [baseCompensation, setBaseConpensation] = useState('');

  const ship = () => {
    console.log("itemName:", itemName);
    console.log("itemDesc:", itemDesc);
    console.log("userAddress:", userAddress);
    console.log("expectedDelivery:", expectedDelivery);
    console.log("baseCompensation:", baseCompensation);

    const targetDate = expectedDelivery;

    // Create a new Date object for the current time
    const date = new Date();

    // Split the target date into year, month, and day
    const [year, month, day] = targetDate.split('-');

    // Set the year, month, and date of the Date object
    date.setFullYear(year);
    date.setMonth(month - 1); // Month is 0-indexed
    date.setDate(day);

    // Convert the Date object to a Unix timestamp
    const timestamp = Math.ceil(date.getTime() / 1000);

    const generateOTP = () => {
      let otp = Math.floor(100000 + Math.random() * 900000);
      return otp.toString();
    };

    const otp = generateOTP();

    shipOrder(itemName, itemDesc, userAddress, timestamp, baseCompensation, otp);


  }

  return (
    <div>
      <br></br>

      <div className="pages">
        <div className="details-page">
          <div className="content-wrapper">
            <h2>Create New Freight Request</h2>
            <form className="section" onSubmit={(event) => event.preventDefault()}>
              <div className="form-field">
                <label htmlFor="itemName" >Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  className="name-input"
                  placeholder="Item Name"
                  onChange={(event) => setItemName(event.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="itemDescription">Item Description</label>
                <textarea
                  id="itemDescription"
                  className="description-input"
                  placeholder="Write a suitable description of item."
                  onChange={(event) => setItemDesc(event.target.value)}
                ></textarea>
              </div>
              <div className="form-field">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  type="text"
                  id="walletAddress"
                  className="name-input"
                  placeholder="Receiver's Wallet address"
                  onChange={(event) => setUserAddress(event.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="expectedDeliveryDate">Expected Delivery Date</label>
                <input type="date" id="expectedDeliveryDate"
                  onChange={(event) => setExpectedDeliverey(event.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="compensationAmount">Compensation Amount</label>
                <input
                  type="text"
                  id="compensationAmount"
                  className="name-input"
                  placeholder="Compensatino Price in XDC"
                  onChange={(event) => setBaseConpensation(event.target.value.toString() + "000000000000000000")}
                />
              </div>
              <button type="submit" className="create-button" onClick={ship}>Create Request</button>
            </form>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default Create;
