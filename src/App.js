import { useState} from "react";
import './App.css';
import StartMinting from './components/StartMinting';
import InProgressMinting from './components/InProgressMinting';
import CompletedMinting from './components/CompletedMinting';

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  const mint = async () => {

  }

  const getTotalSupply = async () =>{

  }

  const login = async () => {
    
  }

  const getState = () => { 
      if(inProgress){
        return <InProgressMinting  />
      }

      if(completed){
        return <CompletedMinting />
      }

      return (
        <StartMinting />
      )
  }


  return (
    <div className="App">

    </div>
  );
}

export default App;
