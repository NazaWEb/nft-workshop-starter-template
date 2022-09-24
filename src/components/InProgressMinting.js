import React from 'react'
import ReactLoading from 'react-loading';

const InProgressMinting = (props) => {
  return (
    <div>
        <div>Your NFT is being minted. Please wait.</div>
        <ReactLoading type="bubbles" color="#fff" />
        <div className='wallet'>CHECK ETHERSCAN</div> 
    </div>
  )
}

export default InProgressMinting