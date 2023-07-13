import React, { useRef, useState } from 'react';
import './Scan.css';

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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleScanParcel = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  };

  const handleCapturePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      video.play();

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        console.log('Captured Image:', imageData);
      };
    }
  };

  return (
    <div className="parcel-container">
      <div className="scan-parcel-box" onClick={handleScanParcel}>
        <h2>Scan Parcel</h2>
      </div>
      <div className="parcel-id-box">
        <input
          type="text"
          id="parcelId"
          className="name-input"
          placeholder="ParcelId"
          onChange={(event) => setParcelId(event.target.value)}
        />
      </div>
      <div className="action-buttons">
        <button onClick={handleCapturePicture}>Capture Picture</button>
      </div>
      <div className="camera-container">
        <video className="camera" ref={videoRef} autoPlay playsInline />
      </div>
      <div className="canvas-container">
        <canvas className="canvas" ref={canvasRef} />
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
