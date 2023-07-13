import React from "react";
import Typewriter from 'typewriter-effect';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Hero from "./components/Hero";
import Navbar from "./components/NavBar"
import Footer from "./components/Footer";


const Home = ({ contract_url, connectedAddress }) => {
  return (
    <>
      <Navbar connectedAddress={connectedAddress} />
      <Hero contract_url={contract_url} />
    </>
  );
};

export default Home;
