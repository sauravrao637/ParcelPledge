import React from 'react';
import './List.css';

const List = ({ connectedAddress, myType, myParcels }) => {
  const getStatusString = (status_) => {
    if (status_ === "0") return "Dispatched";
    else if (status_ === "1") return "In Transit";
    else if (status_ === "2") return "Delivered";
    return "Failed";
  };
  const parcels = myParcels;

  return (
    <div className="parcel-container">
      {parcels.map((parcel) => (
        <div className="parcel-box" key={parcel.id.toString()}>
          <h2>ID: {parcel.id.toString()}</h2>
          <p>Name: {parcel.itemName}</p>
          <p>Description: {parcel.itemDesc}</p>
          <p>Current Location: {parcel.currentLocation}</p>
          <p>Status: {getStatusString(parcel.status.toString())}</p>
          <p>Expected Delivery Date: {(new Date(parcel.expectedDelivery.toString() * 1000).toLocaleString())}</p>
          <p>OTP: {parcel.otp.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
