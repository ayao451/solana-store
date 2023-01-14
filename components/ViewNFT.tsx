import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader } from "./Loader.tsx";
import { SelectAndConnectWalletButton } from "./SelectAndConnectWalletButton.tsx";

import { NftCard } from "./NftCard";
import styles from "../styles/ViewNFT.module.css";
const walletPublicKey = "D6BkuszbQJaDgAgY5bfVoMqR9tScAFtCh4fz9T9Mnccy";

const ViewNFT = () => {
  const { connection } = useConnection();
  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletPublicKey,
    connection,
  });

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>
        <h1 className="mb-5 text-5xl">
          Pokemon Storage
        </h1>
          {!error && isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <NftList nfts={nfts} error={error} />
          )}
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found in this wallet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};

export default ViewNFT;







