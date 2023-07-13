import React, { useRef } from 'react';
import './Scan.css';
import Navbar from './components/NavBar';

const Scan = ({ connectedAddress, myType, markParcelDelivered, updateLocation }) => {
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

  const handleUpdateLocation = () => {
  };

  const handleMarkDelivered = () => {
  };

  return (
    <div className="parcel-container">
      <Navbar connectedAddress={connectedAddress} />
      <div className="scan-parcel-box" onClick={handleScanParcel}>
        <h2>Scan Parcel</h2>
      </div>
      <div className="parcel-id-box">
        <h3>Parcel ID: 123456</h3>
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
        <button onClick={handleUpdateLocation}>Update Location</button>
        <button onClick={handleMarkDelivered}>Mark Delivered</button>
        <div className="parcel-id-box">
          <h3>OTP: 123456</h3>
        </div>
      </div>
    </div>
  );
};

export default Scan;
