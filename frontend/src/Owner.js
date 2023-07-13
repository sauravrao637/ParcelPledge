import React from 'react';
import './Owner.css';

const Owner = () => {
  return (
    <div className="container">
      <div className="left-side">
        <input type="text" className="text-input" placeholder="Enter text" />
        <div className="button-group">
          <button className="gradient-button">Add Partner</button>
          <button className="gradient-button">Add Shipper</button>
          <button className="gradient-button">Remove Associate</button>
        </div>
      </div>
      <div className="right-side">
        <button className="big-button">Fund Contract</button>
        <button className="big-button">Withdraw Funds</button>
      </div>
    </div>
  );
};

export default Owner;
