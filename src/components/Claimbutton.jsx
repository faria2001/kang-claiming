// import React, { useState } from 'react';
// import Web3 from 'web3';

// const ClaimButton = ({ tokenAddress, abi }) => {
//   const [amount, setAmount] = useState('');
//   const [userAddress, setUserAddress] = useState('');

//   const handleClaim = async () => {
//     try {
//       const web3 = new Web3(window.ethereum);
//       await window.ethereum.request({ method: 'eth_requestAccess' });
//       const userAccount = (await web3.eth.getAccounts())[0];
//       setUserAddress(userAccount);

//       const tokenContract = new web3.eth.Contract(abi, tokenAddress);
//       await tokenContract.methods.claim(amount).send({ from: userAccount });
//       alert('Tokens claimed successfully!');
//     } catch (error) {
//       console.error('Error claiming tokens:', error);
//       alert('Failed to claim tokens. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <input
//       className='rounded-sm mb-[10px] p-[10px] bg-white'
//         type="text"
//         placeholder="Enter amount to claim"

//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <br/>
//       <button 
//        className="inline-flex rounded-md text-white 
//        font-sans-serif font-bold bg-[#643eba] border-0 py-2 px-12 focus:outline-none text-lg hover:bg-[#6b46c2]"
//       onClick={handleClaim}>Claim</button>
//     </div>
//   );
// };

// export default ClaimButton;

