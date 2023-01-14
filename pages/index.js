import React, { useState, useEffect} from "react";
import CreateProduct from "../components/CreateProduct";
import ViewNFT from "../components/ViewNFT";
import Product from "../components/Product";
import HeadComponent from '../components/Head';

import CandyMachine from "../components/CandyMachine";
import dynamic from 'next/dynamic';
const WalletMultiButton = dynamic(() => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton), {ssr: false});


import { useWallet } from "@solana/wallet-adapter-react";

import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';

const GITHUB_HANDLE = 'ayao451';
const GITHUB_LINK = `https://github.com/ayao451/solana-store`;

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [minting, setMinting] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [products, setProducts] = useState([]);

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
    return (
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    );
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
          {(
              <button className="view-nft-button" onClick={() => setViewing(!viewing)}>
                  {viewing ? "Close" : "View Your Pokemon"}
              </button>
          )}
        </header>

        <main>
          {viewing && <ViewNFT />}
          {creating && <CreateProduct />}
          {publicKey ? (minting ? <CandyMachine walletAddress={publicKey} /> : renderItemBuyContainer()) : renderNotConnectedContainer()}
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