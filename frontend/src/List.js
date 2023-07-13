import React from 'react';
import './List.css';

const List = ({ connectedAddress, myType, myParcels }) => {
  const getStatusString = (status_) => {
    if (status_ === "0") return "Dispatched";
    else if (status_ === "1") return "In Transit";
    else if (status_ === "2") return "Delivered";
    return "Failed";
  }
  // const parcels = [
  //   {
  //     id: '1',
  //     name: 'Parcel 1',
  //     description: 'Sample description for Parcel 1',
  //     currentLocation: 'Location A',
  //     status: 'In Transit',
  //     expectedDeliveryDate: '2023-07-12',
  //     otp: '123456',
  //   },
  //   {
  //     id: '2',
  //     name: 'Parcel 2',
  //     description: 'Sample description for Parcel 2',
  //     currentLocation: 'Location B',
  //     status: 'Delivered',
  //     expectedDeliveryDate: '2023-07-10',
  //     otp: '654321',
  //   },
  //   {
  //     id: '3',
  //     name: 'Parcel 3',
  //     description: 'Sample description for Parcel 3',
  //     currentLocation: 'Location C',
  //     status: 'In Transit',
  //     expectedDeliveryDate: '2023-07-15',
  //     otp: '987654',
  //   },
  // ];
  const parcels = myParcels;

  return (
    <div className="parcel-container">
      {parcels.map((parcel) => (
        <div className="parcel-box" key={parcel.id}>
          <h2>ID: {parcel.id}</h2>
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
