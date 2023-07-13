import React from "react";
import Typewriter from 'typewriter-effect';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Hero from "./components/Hero";
import Footer from "./components/Footer";


const Home = ({ contract_url, connectedAddress }) => {
  return (
    <>
      <Hero contract_url={contract_url} />
    </>
  );
};

export default Home;
