import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';
import { useMoralis } from "react-moralis";
import abi from "./contracts/contract.json";
import StartMinting from './components/StartMinting';
import InProgressMinting from './components/InProgressMinting';
import CompletedMinting from './components/CompletedMinting';

function App() {
  // create a state varaible for supply
  const [totalSupply, setTotalSupply] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [hash, setHash] = useState();
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

  const checkEtherScan = () => {
    if(!hash) return;
    const url = `https://rinkeby.etherscan.io/tx/${hash}`;
    window.open(url, '_blank');
  }

  const mint = async () => {
    const sendOptions = {
      contractAddress: "0x718fD0990c355C315fcF5e00130D6f236a31d3E2",
      functionName: "safeMint",
      abi: abi,
      msgValue: Moralis.Units.ETH("0.01")
    };
    // add ether to in sendOption for MOralis
    const transaction = await Moralis.executeFunction(sendOptions);
    setHash(transaction.hash);
    setInProgress(true);
    // waits a confirmation from the blockchain
    await transaction.wait();
    // we are done and confirmed
    setInProgress(false);
    setCompleted(true);
    // here, means we are done and confirmed
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

    console.log("yooooo")
    const message = await Moralis.executeFunction(sendOptions);
    setTotalSupply(message.toNumber());
    // when do we know that transaction is completed
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

  const getState = () => {
    if(isAuthenticated){    
      if(inProgress){
        return <InProgressMinting checkEtherscan={checkEtherScan} />
      }

      if(completed){
        return <CompletedMinting />
      }

      return (
        <StartMinting mint={mint} logOut={logOut} />
      )
    } else {
      return <div onClick={login} className='wallet'>CONNECT WALLET</div> 
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
              {getState()}
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
