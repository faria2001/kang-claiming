import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import abi from './../config/abi.json'
import treeJson from './../config/tree.json' 
import { CONFIG } from './../config/config'
import { useState } from "react";

import { writeContract, waitForTransactionReceipt  } from '@wagmi/core'
import { useAccount, useConfig, useReadContracts } from 'wagmi';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import '@sweetalert2/theme-dark/dark.min.css';
import Loading from "./Loading";

// new
// import { useContract,  useContractQuery, useContractMutation } from 'wagmi';




import { ethers } from "ethers";
import { useEffect } from "react";


// import Web3 from 'web3';
// import ClaimButton from "./Claimbutton";



const Hero = () => {
  const [loading, setLoading] = useState(false)
  const {address, isConnected} = useAccount()
  const config = useConfig()

  const handleClaim = async () => {
    if(!isConnected) {
        MySwal.fire({
            title: "Error",
            text: "Connect Your Wallet",
            icon: "error"
        });
        return
    }
    try {
        setLoading(true)
        const tree = StandardMerkleTree.load(treeJson);
        let proof;
        let amount;
        for (const [i, v] of tree.entries()) {
            if (v[0] === address) {
            proof = tree.getProof(i);
            amount = v[1]
            }
        }
        
        const tx = await writeContract(config, {
            address: CONFIG.CLAIM_CONTRACT,
            abi: abi,
            functionName: 'Claim',
            args: [amount ,proof]
        })
        console.log(tx)
        const result = await waitForTransactionReceipt(config, {
            hash: tx
        })
        console.log(result)

        setLoading(false)
        
        MySwal.fire({
            title: "Congratulation",
            text: "Your transaction has been completed successfully",
            icon: "success"
        });
          
    } catch (e) {
        console.log(e)
        setLoading(false)

        MySwal.fire({
            title: "Oops!",
            text: "Something went wrong",
            icon: "error"
        });
    }
  }
//   new
const [currentAccount, setCurrentAccount ] = useState('');
const [userAddress, setUserAddress] = useState('');
const [walletBalance , setWalletBalance] = useState(0);

useEffect(() => { 
    const detailsOn = async () => { 
        const { ethereum } = window;

        //  if (!ethereum) 
           if (typeof window.ethereum == 'undefined')
            { 
         setUserAddress('0')
         setWalletBalance('0')
          return;
         }
         
         const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const addr = await signer.getAddress();
           setUserAddress(addr.toString()); 

           const balance = await provider.getBalance(addr);
           setWalletBalance(ethers.utils.formatEther(balance));
        };

        detailsOn();
    }, [] );

// fromTradecurve
// const { data, isPending, isSuccess, refetch } = useReadContracts({
//     contracts: [
//       {
//         ...claimingContract,
//         functionName: "userInitialized",
//         args: [address],
//       },
//       {
//         ...claimingContract,
//         functionName: "userBalance",
//         args: [address],
//       },
//       {
//         ...claimingContract,
//         functionName: "tokensClaimed",
//         args: [address],
//       },
//     ],
//   });



    // claim button
    // const tokenAddress = '0x83cdF3427b5E04aD06e80304d200c07B20CfB652'; 
    // Replace with your token contract address
    // const tokenABI = [abi];
     // Replace with your token contract ABI
     
     //from trade curve

    //  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
    //  useEffect(() => {
    //     if (isConnected) {
    //         refetch()
    //       const tree = StandardMerkleTree.load(treeJson);
    //       let totalTokens = 0;
    //       for (const [i, v] of tree.entries()) {
    //         if (v[0] === address) {
    //           totalTokens = v[1];
    //         }
    //       }
    
    //       setTotalPurchaseAmount(formatEther(totalTokens));
    //     }
    //   }, [address, isConnected]);
    

     
    //  const { write } = useContractWrite({
    //    address: '0x83cdF3427b5E04aD06e80304d200c07B20CfB652',
    //    abi: [abi],
    //    functionName: 'claim',
    //    args: ['100'],
    //  });
   
  
//   const [showtext, setShowtext] = useState("Wallet Address");

//   const handletext=(e)=>{
//     const  getvalue= e.target.value
    
//     if(getvalue=={w3m-butt})
//       {
//         const show="5.00%"
//         setShowtext(show);
//       }
//       else if(getvalue==20)
//       {
//         const show="15.00%"
//         setShowtext(show);
//       }
//       else if(getvalue==45)
//         {
//           const show="35.00%"
//           setShowtext(show);
//         }
//         else
//           {
//             const show="5.00%"
//             setShowtext(show);
//           }
//   }

  return (
    <>
        {loading && <Loading />}
        <section className="text-gray-600 body-font bg-[url('/kang2.jpg')] bg-fixed min-h-[calc(100vh-72px-70px)] bg-cover bg-center flex">
          <div className=" bg-black bg-opacity-10  max-w-[2300px] w-[100%]">
            <div className="container max-w-[1200px] mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold font-sans-serif text-[white] ">Claim Your Kangamoon Tokens</h1>
                
                
                <div className="max-w-[2000px] w-[100%]">
                <div className="claimBox h-auto w-[100%] flex justify-center text-start pl-[20px] pt-[20px] pb-[20px]
                gap-[20px] border-none
                 text-[white]  border-[1px] mb-[20px] flex-col rounded-md bg-gradient-to-r from-[#6d45bc] to-[#bd86ec]">
                    
                    <div>
                        <h1 className="text-[20px] font-bold font-sans-serif ">Wallet Address</h1>
                        <div className="max-w-[500px] mr-[20px] w-[100%] overflow-hidden flex ">
                         <p >
                            {userAddress}
                            Address
                            </p>
                           </div>
                        </div>
                       
                       <div>
                        <h1  className=" text-[20px] font-bold font-sans-serif ">Claiming Amount</h1>
                        <p>
                            {walletBalance} 
                        ETH</p>
                       </div>
                                         {/* <div>
                    <h1 className=" text-[20px] font-bold font-sans-serif ">
                      Purchase Amount
                    </h1>
                    <p>
                      {new Intl.NumberFormat("en-us").format(
                        totalPurchaseAmount
                      )}
                    </p>
                  </div> */}

                  

                     

                       <div className="w-[100%] flex justify-center max-w-[700px] self-center mr-[20px] bg-white h-[2px]"></div>
                       <div className="mr-[20px]">
                        <p className="text-[white]">
                            <span className="font-bold">Claming Schedule :</span>
                           User can start claiming their presale token as per
                            <br></br>
                            following schedule:
                             </p>
                             <div>
                                <br/>
                             <ul>
                                <div className="flex flex-row">
                                     <div className="bg-[#332165] rounded-full mt-[9px] mr-[5px] h-[5px] w-[5px]"></div>
                                    Frist claim of 25% starts from 1st June,2024</div>
                                    <div className="flex flex-row">
                                     <div className="bg-[#332165] rounded-full mt-[9px] mr-[5px] h-[5px] w-[5px]"></div>
                                     Second claim of 25% starts from 8th June,2024</div>
                                     <div className="flex flex-row">
                                     <div className="bg-[#332165] rounded-full mt-[9px] mr-[5px] h-[5px] w-[5px]"></div>
                                     Third claim of 25% starts from 15th Jne,2024</div>
                                     <div className="flex flex-row">
                                     <div className="bg-[#332165] rounded-full mt-[9px] mr-[5px] h-[5px] w-[5px]"></div>
                                     Fourth claim of 25% starts from 22nd June,2024</div>
                             </ul>
                             </div>
                       </div>

                 </div>

                  </div>


                <div className="flex justify-center">
                    <button 
                    disabled={loading}
                     className="inline-flex rounded-md text-white font-sans-serif
                      font-bold bg-[#643eba] border-0 py-2 px-12 focus:outline-none
                       text-lg hover:bg-[#6b46c2]"
                        onClick={handleClaim}
                        >
                            Claim
                            </button>
                            
                    {/* <ClaimButton
                    tokenAddress={tokenAddress} abi={tokenABI} /> */}
                </div>
             
                </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default Hero