import React from 'react'

const CompletedMinting = () => {

    const viewOpensea = () => {
        const url = `https://testnets.opensea.io/collection/web3doodles-kbznruu4ms`;
        window.open(url, '_blank');
    }

  return (
    <div>
        <div>All set! You NFT has been minted.</div>
        <div onClick={viewOpensea} className='wallet'>VIEW OPENSEA</div> 
    </div>
  )
}

export default CompletedMinting