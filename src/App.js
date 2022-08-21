import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';
import { useMoralis } from "react-moralis";
import abi from "./contracts/contract.json";

function App() {
  // create a state varaible for supply
  const [totalSupply, setTotalSupply] = useState(0);
  const { Moralis, enableWeb3, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const logOut = async () => {
    await logout();
  }

  useEffect(()=>{
    const getSupply = async () => {
      if(isAuthenticated){
        await enableWeb3();
        getTotalSupply();
      }
    }
    getSupply();
  }, [isAuthenticated])

  const mint = async () => {
    const sendOptions = {
      contractAddress: "0x718fD0990c355C315fcF5e00130D6f236a31d3E2",
      functionName: "safeMint",
      abi: abi,
      msgValue: Moralis.Units.ETH("0.01")
    };
    // add ether to in sendOption for MOralis
    const transaction = await Moralis.executeFunction(sendOptions);

  }

  // Create a function to get supply of our NFTs
  // how many NFTs have been minted so far
  // use the totalSupply function to get totalSupply()

  const getTotalSupply = async () =>{
    const sendOptions = {
      contractAddress: "0x718fD0990c355C315fcF5e00130D6f236a31d3E2",
      functionName: "totalSupply",
      abi: abi
    };
    // add ether to in sendOption for MOralis
    const message = await Moralis.executeFunction(sendOptions);
    setTotalSupply(message.toNumber());
  }

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className="App">
      <video className="background-video" width="400" height="400" autoPlay muted playsInline loop>
        <source src="https://cdn-std.droplr.net/files/acc_990213/aIieHW" type="video/mp4" />
      </video>
      <div className='main'>
        <div className='minting'>
          <div className='left-column'>
            <video width="400" height="400" autoPlay muted playsInline loop>
              <source src="https://cdn-std.droplr.net/files/acc_990213/d9ucir" type="video/mp4" />
            </video>
          </div>
          <div className='right-column'>
            <h2>YOOOO: INTO THE METAVERSE</h2>
            <div>{totalSupply} minted / 200</div>
            <div className='actions'>
              {
                isAuthenticated
                  ? <div className='mintStart'>
                      <div onClick={mint} className='wallet'>MINT</div> 
                      <div onClick={logOut} className='wallet'>START OVER</div> 
                    </div>
                  : <div onClick={login} className='wallet'>CONNECT WALLET</div> 
              }

            </div>
          </div>
        </div>
        <div className='footer'>
           MINTING NOW
        </div>
      </div>
    </div>
  );
}

export default App;
