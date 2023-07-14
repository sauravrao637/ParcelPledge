import React, { useState } from "react";

import './Owner.css';

const Owner = ({ walletAddress, myType, addShipper, addPartner, removeAssociate, fundContract, withdrawFunds }) => {
  const [userAddress, setUserAddress] = useState("");

  const addUserAsShipper = () => {
    addShipper(userAddress);
  }

  const addUserAsPartner = () => {
    addPartner(userAddress);
  }

  const removeUserAsAssociate = () => {
    removeAssociate(userAddress);
  }

  const fundContractTen = () => {
    fundContract("10000000000000000000");
  }


  return (
    <div className="container">
      <div className="left-side">
        <input type="text" className="text-input" placeholder="Enter User Address" onChange={(event) => setUserAddress(event.target.value)} />
        <div className="button-group">
          <button className="gradient-button" onClick={addUserAsShipper}>Add Shipper</button>
          <button className="gradient-button" onClick={addUserAsPartner}>Add Partner</button>
          <button className="gradient-button" onClick={removeUserAsAssociate}>Remove Associate</button>
        </div>
      </div>
      <div className="right-side">
        <button className="big-button" onClick={fundContractTen}>Fund Contract</button>
        <button className="big-button" onClick={withdrawFunds}>Withdraw Funds</button>
      </div>
    </div>
  );
};

export default Owner;
