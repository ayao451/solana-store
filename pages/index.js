import React, { useState, useEffect} from "react";
import CreateProduct from "../components/CreateProduct";
import Product from "../components/Product";
import HeadComponent from '../components/Head';

import CandyMachine from "../components/CandyMachine";
import dynamic from 'next/dynamic';
const WalletMultiButton = dynamic(() => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton), {ssr: false});


import { useWallet } from "@solana/wallet-adapter-react";

import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
// import {
//   Program, AnchorProvider, web3
// } from '@project-serum/anchor';

// // Constants

// // SystemProgram is a reference to the Solana runtime!
// const { SystemProgram, Keypair } = web3;

// let baseAccount = Keypair.generate();

// const programID = new PublicKey("4XKzta23hVDVuKdbLpv61P6PuSEM2oUNAGeTsJYcbd4m");

// // Set our network to devnet.
// const network = clusterApiUrl('devnet');

// // Controls how we want to acknowledge when a transaction is "done".
// const opts = {
//   preflightCommitment: "processed"
// }

const GITHUB_HANDLE = 'ayao451';
const GITHUB_LINK = `https://github.com/ayao451/solana-store`;

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [minting, setMinting] = useState(false);
  const [products, setProducts] = useState([]);
  // const [orderList, setOrderList] = useState([]);

  
  // const getProvider = () => {
  //   const connection = new Connection(network, opts.preflightCommitment);
  //   const provider = new AnchorProvider(
  //     connection, window.solana, opts.preflightCommitment,
  //   );
  //   return provider;
  // }

  // const getProgram = async () => {
  //   // Get metadata about your solana program
  //   const idl = await Program.fetchIdl(programID, getProvider());
  //   // Create a program that you can call
  //   return new Program(idl, programID, getProvider());
  // };
  
  // const getOrderList = async() => {
  //   try {
  //     const program = await getProgram(); 
  //     const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      
  //     console.log("Got the account", account)
  //     setOrderList(account.orderList)
  
  //   } catch (error) {
  //     console.log("Error in getOrderList: ", error)
  //     setOrderList(null);
  //   }
  // }


  // const sendOrder = async () => {
  //     if (inputValue.length === 0) {
  //         console.log("No gif link given!");
  //         return;
  //     }
  //     setInputValue([]);
  //     console.log("Gif link:", inputValue);
  //     try {
  //         const provider = getProvider();
  //         const program = await getProgram();

  //         await program.rpc.addOrder(inputValue, {
  //             accounts: {
  //                 baseAccount: baseAccount.publicKey,
  //                 user: provider.wallet.publicKey,
  //             },
  //         });
  //         console.log("GIF successfully sent to program", inputValue);

  //         await getOrderList();
  //     } catch (error) {
  //         console.log("Error sending GIF:", error);
  //     }
  //   };

  // const onInputChange = (event) => {
  //     const { value } = event.target;
  //     setInputValue(value);
  // };


  
  // useEffect(() => {
  //   if (publicKey) {
  //     console.log('Fetching Order list...');
  //     getOrderList()
  //   }
  // }, [publicKey]);

  // const createOrderAccount = async () => {
  //   try {
  //     const provider = getProvider();
  //     const program = await getProgram();
      
  //     console.log("ping")
  //     await program.rpc.initialize({
  //       accounts: {
  //         baseAccount: baseAccount.publicKey,
  //         user: provider.wallet.publicKey,
  //         systemProgram: SystemProgram.programId,
  //       },
  //       signers: [baseAccount]
  //     });
  //     console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
  //     await getOrderList();
  
  //   } catch(error) {
  //     console.log("Error creating BaseAccount account:", error)
  //   }
  // }

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );
  
  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderItemBuyContainer = () => {
    // if (orderList === null) {
    //   return (
    //     <div className="connected-container">
    //       <button className="cta-button submit-gif-button" onClick={createOrderAccount}>
    //         Do One-Time Initialization For Order Program Account
    //       </button>
    //     </div>
    //   );
    // } else {
      return (
        <div className="products-container">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      );
    //}
  }

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> NFT Store</p>
          <p className="sub-text">Sell your NFTs for Solana here!</p>

          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
          {(
              <button className="mint-nft-button" onClick={() => setMinting(!minting)}>
                  {minting ? "Close" : "Mint New Pokemons"}
              </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {minting && <CandyMachine walletAddress={publicKey} />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        
        <div className="footer-container">
          <img alt="Github Logo" className="github-logo" src="github-logo.png" width="15" height="15" />
          <a
            className="footer-text"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          >{`explore the code at @${GITHUB_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;