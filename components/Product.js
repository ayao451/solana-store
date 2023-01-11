import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import Buy from "./Buy";
import { useWallet } from "@solana/wallet-adapter-react";
import { hasPurchased } from "../lib/api";

export default function Product({ product }) {
  const { id, name, price, description, image_url, quantity } = product;
  const { publicKey } = useWallet();
  const [purchaseStatus, setPurchaseStatus] = useState(false);

  useEffect(() => {
    // Check if this address already has already purchased this item
    // If so, fetch the item and set paid to true
    // Async function to avoid blocking the UI
    async function checkPurchased() {
      const purchased = await hasPurchased(publicKey, id);
      if (purchased) {
        setPurchaseStatus(true);
      }
    }
    checkPurchased();
  });
  
  return !purchaseStatus && (quantity == 0) ? null
  : (
      <div className={styles.product_container}>
        <div >
          <img className={styles.product_image}src={image_url} alt={name} />
        </div>

        <div className={styles.product_details}>
          <div className={styles.product_text}>
            <div className={styles.product_title}>{name}</div>
            <div className={styles.product_description}>{description}</div>
          </div>

          <div className={styles.product_action}>
            <div className={styles.product_price}>{price} SOL</div>
              {/* Replace the IPFS component with the Buy component! */}
              <Buy itemID={id} />
          </div>
        </div>
      </div>
    );
}