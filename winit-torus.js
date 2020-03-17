import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
const torus = new Torus();

torus.init({
      buildEnv: "alpha5", // default: production
      showTorusButton: false // default: true
    }).then(()=>{window.ethereum=torus.ethereum,window.Web3=torus.Web3,window.torus=torus,window.web3=torus.web3});