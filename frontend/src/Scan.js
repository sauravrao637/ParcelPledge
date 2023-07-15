import React, { useRef, useState } from 'react';
import './Scan.css';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
const Scan = ({ connectedAddress, myType, markParcelDelivered, updateLocation }) => {
  const [parcelId, setParcelId] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const updateLoc = () => {
    if (navigator.geolocation) {
      let location_ = '';
      navigator.geolocation.getCurrentPosition((position) => {
        location_ = "" + position.coords.latitude + ',' + '' + position.coords.longitude;
        console.log("location_ =", location_);
      });
      updateLocation([parcelId], location_);
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }

  const markDelivered = () => {
    markParcelDelivered(parcelId, otpValue);
  }

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    const info = decodedText.split(' ');
    // const element = document.getElementById('parcelId');
    // element.textContent = info[2];
    setParcelId(info[2]);
    // setDecodedResults(prev => [...prev, decodedResult]);
  };

  return (
    <div className="parcel-containers">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult} />

      <div className="parcel-id-box">
        <input
          type="text"
          id="parcelId"
          value={parcelId}
          className="name-input"
          placeholder="ParcelId"
          onChange={(event) => setParcelId(event.target.value)}
        />
      </div>
      <div className="action-buttons">
        <button onClick={updateLoc}>Update Location</button>
        <button onClick={markDelivered}>Mark Delivered</button>
        <div className="parcel-id-box">
          <input
            type="text"
            id="otp_value"
            className="name-input"
            placeholder="OTP"
            onChange={(event) => setOtpValue(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Scan;
