
// UI Imports 
import React, { useState, useEffect } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import Scan from './Scan';
import List from './List';
import Owner from './Owner';
import Navbar from "./components/NavBar";
import { useToast } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';


// WEB3 Imports
import Web3 from 'web3';
import { addrParcel, CHAIN_PARAMS, DEFAULT_USER_TYPE, DEBUG, TESTING_USER_TYPE, generateQRCode } from './utils';

const processedEvents = [];
const eventTopicPS = "0x32c1836ded10d94133bd527768a93f4a18336e79a66c70baa8093401c9e3440f";
const eventTopicLU = "0xa3c313d9290f28b0a583dcc5ceabc0a50c3124d1ae9ae1630668c1f404d5a6b6";
const eventTopicPD = "0x3be6b44b0d8170026cc992b6b6eda259b98e02d16bdfe4b9dd3db223b5420cfd"
const fromBlock = '0x0'; // Start listening from the first block
const rpcEndpoint = 'https://erpc.apothem.network';


function App() {

  // web3 essentials
  const [walletAddress, setWalletAddress] = useState('_');
  const [web3, setWeb3] = useState(null);
  const [camoParcelInstance, setCamoParcelInstance] = useState(null);

  // contract variables
  const [myType, setMyType] = useState(DEFAULT_USER_TYPE);
  const [myParcels, setMyParcels] = useState([]);
  const toast = useToast();


  const [stopEventListeners, setStopEventListeners] = useState([]);

  const listenToEvents = async (walletAddress, contractAddress, eventTopic, fromBlock) => {
    // Create a new event filter
    const filterId = await sendRpcRequest('eth_newFilter', [{
      address: contractAddress,
      topics: [eventTopic],
      fromBlock
    }]);

    // Poll for new events every 5 seconds
    async function pollEvents() {
      const events = await sendRpcRequest('eth_getFilterChanges', [filterId]);
      events.forEach(event => {
        processEvent(walletAddress, event)
      });
    }

    const intervalId = setInterval(async () => {
      await pollEvents();
    }, 5000);

    setStopEventListeners(prevStopEventListeners => [...prevStopEventListeners, intervalId]);
  }

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
    getMyType();
    if (myType === DEFAULT_USER_TYPE) {
      getMyParcels();
    }
  }, [camoParcelInstance, walletAddress])

  const setupEventListeners = (walletAddress) => {
    listenToEvents(walletAddress, addrParcel, eventTopicLU, fromBlock);
    listenToEvents(walletAddress, addrParcel, eventTopicPS, fromBlock);
    listenToEvents(walletAddress, addrParcel, eventTopicPD, fromBlock);
  }

  const parcelShippedEvent = async (walletAddress, sender, receiver, parcelId) => {
    console.log(`Parcel ${parcelId} shipped from ${sender} to ${receiver}`);
    if (sender === walletAddress) {
      const text = sender + " " + receiver + " " + parcelId;
      const qr_url = await generateQRCode(text);
      console.log("qr_url:- ", qr_url);
      toast({
        title: 'Parcel Shipped',
        description: `Your parcel with ID ${parcelId} has been shipped to ${receiver}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    else if (receiver === walletAddress) {
      toast({
        title: 'Parcel Shipped',
        description: `You have received a parcel with ID ${parcelId} from ${sender}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const parcelLocationUpdatedEvent = (walletAddress, partner, receiver, parcelId) => {

    console.log(`Parcel ${parcelId} updated by ${partner}, `, walletAddress);
    if (partner === walletAddress) toast({
      title: 'Parcel Location Updated',
      description: `Location for parcel with ID ${parcelId} has been updated by successfully`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    else if (receiver === walletAddress) toast({
      title: 'Parcel Location Updated',
      description: `Location for your parcel with ID ${parcelId} has been updated by ${partner}`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  const ParcelDeliveredEvent = (walletAddress, partner, receiver, parcelId) => {
    if (partner === walletAddress || receiver === walletAddress) toast({
      title: 'Parcel Delivered',
      description: `Parcel with ID ${parcelId} has been delivered by ${partner}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

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
      stopEventListeners.forEach(stopPolling => clearInterval(stopPolling));
      setupEventListeners(walletAddress);
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


  async function sendRpcRequest(method, params) {
    const response = await fetch(rpcEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params
      })
    });
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json.result;
  }
  function processEvent(walletAddress, event) {
    const eventId = `${event.blockHash}-${event.transactionHash}-${event.logIndex}`;
    if (processedEvents.includes(eventId)) {
      return;
    }
    processedEvents.push(eventId);

    console.log(`New event: ${JSON.stringify(event)}`);
    const eventTopic = event.topics[0];
    let name_temp = "ParcelShippedEvent";

    if (eventTopic === eventTopicLU) {
      name_temp = "ParcelLocationUpdated";
    } else if (eventTopic === eventTopicPD) {
      name_temp = "ParcelDelivered";
    } else if (eventTopic !== eventTopicPS) {
      return;
    }
    const eventAbi = {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "arg1",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "arg2",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "arg3",
          "type": "uint256"
        }
      ],
      "name": name_temp,
      "type": "event"
    };

    // Decode the data
    const decodedData = (new Web3()).eth.abi.decodeLog(eventAbi.inputs, event.data, event.topics.slice(1));

    // Access the decoded data
    const event_updater = decodedData.arg1;
    const receiver = decodedData.arg2;
    const parcelId = decodedData.arg3;
    console.log("event_updater:- ", event_updater);
    console.log("receiver:- ", receiver);
    console.log("parcelId:- ", parcelId);

    if (eventTopic === eventTopicLU) {
      parcelLocationUpdatedEvent(walletAddress, event_updater, receiver, parcelId);
    } else if (eventTopic === eventTopicPD) {
      ParcelDeliveredEvent(walletAddress, event_updater, receiver, parcelId);
    } else if (eventTopic === eventTopicPS) {
      parcelShippedEvent(walletAddress, event_updater, receiver, parcelId);
    }
  }
  // this function reloads the wepage whenever the connected account changes
  const listenMMAccount = async () => {
    try {
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
      const result = await camoParcelInstance.methods.getMyType().call({ from: window.web3.currentProvider.selectedAddress });
      console.log("myType = ", result);
      if (DEBUG) {
        setMyType(TESTING_USER_TYPE);
      } else {
        setMyType(result.toString());
      }

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
      console.log(result);
      setMyParcels(result);
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
      console.log(result);
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
      console.log(result);
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
  const shipOrder = async (itemName, itemDesc, userAddress, expectedDelivery, baseCompensation, otp) => {
    console.log("shipOrder() called,");
    try {
      const result = await camoParcelInstance.methods.shipOrder(itemName, itemDesc, userAddress, expectedDelivery, baseCompensation, otp).send({ from: window.web3.currentProvider.selectedAddress })
      console.log(result);
      // TODO prompt qr print;
    } catch (error) {
      console.error(error);
    }
  }

  const getParcel = async (parcelId) => {
    console.log("viewParcel(_) called ,", parcelId);
    try {
      const result = await camoParcelInstance.methods.viewParcel(parcelId).call({ from: window.web3.currentProvider.selectedAddress });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (

    <ChakraProvider>
      <div className="App">
        <Router>
          <Navbar connectedAddress={walletAddress} myType={myType} />
          <Routes>
            <Route path="/" element={<Home connectedAddress={walletAddress} />} />

            <Route path="/shipper" element={<Create connectedAddress={walletAddress} myType={myType} shipOrder={shipOrder} />} getParcel={getParcel} />

            <Route path="/partner" element={<Scan connectedAddress={walletAddress} myType={myType} markParcelDelivered={markParcelDelivered} updateLocation={updateLocation} />} />

            <Route path="/myparcels" element={<List connectedAddress={walletAddress} myType={myType} myParcels={myParcels} />} />

            <Route path="/owner" element={<Owner connectedAddress={walletAddress} addPartner={addPartner} addShipper={addShipper} removeAssociate={removeAssociate} fundContract={fundContract} withdrawFunds={withdrawFunds} />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
