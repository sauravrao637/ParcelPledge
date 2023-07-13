
// UI Imports 
import React, { useState, useEffect } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import Scan from './Scan';
import List from './List';

// WEB3 Imports
import Web3 from 'web3';
import { addrParcel, CHAIN_PARAMS } from './utils'

const BigNumber = require('bignumber.js');
const bnZero = new BigNumber(0);

const DEFAULT_USER_TYPE = 2;
const TYPE_SHIPPER = 0;
const TYPE_PARTNER = 1;
const TYPE_OWNER = 999;

function App() {

  // web3 essentials
  const [walletAddress, setWalletAddress] = useState('_');
  const [web3, setWeb3] = useState(null);
  const [camoParcelInstance, setCamoParcelInstance] = useState(null);

  // contract variables
  const [myType, setMyType] = useState(DEFAULT_USER_TYPE);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (!web3) {
      console.error("web3 is NULL")
      return;
    }
    listenMMAccount();
    loadContracts();
  }, [web3]);

  useEffect(() => {
    if (!camoParcelInstance) {
      console.error("camoParcelInstance is NULL")
      return;
    }
    // TODO
    getMyType();

  }, [camoParcelInstance, walletAddress])

  const connectWallet = async () => {
    console.log("connectWallet() called")

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [CHAIN_PARAMS],
      });

      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        // Get the selected account
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        setWalletAddress(address);
        setWeb3(web3);
      } else {
        console.error('Metamask extension not detected');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect Metamask. Please try again.');
    }
  };

  const loadContracts = () => {
    console.log("loadContracts() called")
    if (!web3) throw new Error("Web3 is null")
    console.log("web3:- ", web3);
    try {
      loadParcelContract();
    } catch (error) {
      console.error(error);
    }
  }

  const loadParcelContract = async () => {
    console.log("loadParcelContract() called")

    try {
      const web3Instance = web3; // Access the web3 state variable
      let { abi } = require('./contract_abis/CamoParcel.json');
      const camoParcelAbi = abi

      console.log("camoParcelAbi:- ", camoParcelAbi);

      const camoParcelInstance = new web3Instance.eth.Contract(camoParcelAbi, addrParcel);

      console.log("camoParcelInstance:- ", camoParcelInstance);
      setCamoParcelInstance(camoParcelInstance);
    } catch (error) {
      console.error(error)
    }
  }

  // this function reloads the wepage whenever the connected account changes
  const listenMMAccount = async () => {
    try {
      const web3Instance = web3;
      window.ethereum.on("accountsChanged", async function () {
        window.location.reload();
      });
    } catch (error) {
      console.error(error)
    }
  }


  // contract functions
  // ---->general user
  const getMyType = async () => {
    console.log("getMyType() called");
    try {
      const result = await camoParcelInstance.methods.getMyType(window.web3.currentProvider.selectedAddress).call();
      console.log("myType = ", result);
      setMyType(result);
    } catch (error) {
      console.error(error);
    }
  }

  const getBalance = async () => {
    console.log("getBalance() called");
    try {
      const result = await camoParcelInstance.methods.getBalance().call();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const getMyParcels = async () => {
    console.log("getMyParcels() called");
    try {
      const result = await camoParcelInstance.methods.viewMyParcels().call({ from: window.web3.currentProvider.selectedAddress });
      // TODO set list of parcels
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  // ---->contract owner
  const addPartner = async (partner_address) => {
    console.log("addPartner(_) called ,", partner_address);
    try {
      const result = await camoParcelInstance.methods.addPartner(partner_address).send({ from: window.web3.currentProvider.selectedAddress });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const addShipper = async (shipper_address) => {
    console.log("addShipper(_) called ,", shipper_address);
    try {
      const result = await camoParcelInstance.methods.addShipper(shipper_address).send({ from: window.web3.currentProvider.selectedAddress });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const fundContract = async (amount) => {
    console.log("fundContract(_) called ,", amount);
    try {
      const result = await camoParcelInstance.methods.fund().send({ from: window.web3.currentProvider.selectedAddress, value: amount })
    } catch (error) {
      console.error(error);
    }
  }

  const removeAssociate = async (address) => {
    console.log("removeAssociate(_) called ,", address);
    try {
      const result = await camoParcelInstance.methods.removeAssociate(address).send({ from: window.web3.currentProvider.selectedAddress });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const withdrawFunds = async () => {
    console.log("withdrawFunds() called");
    try {
      const result = await camoParcelInstance.methods.withdrawFunds().send({ from: window.web3.currentProvider.selectedAddress });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  // ---->partner 
  const markParcelDelivered = async (parcelId, otp) => {
    console.log("markParcelDelivered(_,_) called ,", parcelId, otp);
    try {
      const result = await camoParcelInstance.methods.markParcelDelivered(parcelId, otp).send({ from: window.web3.currentProvider.selectedAddress })
    } catch (error) {
      console.error(error);
    }
  }

  const updateLocation = async (parcelIds, location) => {
    console.log("updateLocation(_,_) called ,", parcelIds, location);
    try {
      const result = await camoParcelInstance.methods.updateLocation(parcelIds, location).send({ from: window.web3.currentProvider.selectedAddress });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  // ---->Shipper
  const shipOrder = async () => {
    console.log("shipOrder() called,");
    try {
      const result = await camoParcelInstance.methods.shipOrder(itemName, itemDesc, userAddress, expectedDelivery, baseCompensation, otp).send({ from: window.web3.currentProvider.selectedAddress })
      console.log(result);
      // TODO prompt qr print;
    } catch (error) {
      console.error(error);
    }
  }

  const viewParcel = async (parcelId) => {
    console.log("viewParcel(_) called ,", parcelId);
    try {
      const result = await camoParcelInstance.methods.viewParcel(parcelId).call({ from: window.web3.currentProvider.selectedAddress });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipper" element={<Create />} />
          <Route path="/partner" element={<Scan />} />
          <Route path="/myparcels" element={<List />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
