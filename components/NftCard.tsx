import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";
import styles from "../styles/NFT.module.css";

import { fetcher } from "./utils/fetcher";

type Props = {
  details: any;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onSelect,
  onTokenDetailsFetched = () => {},
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { name, uri } = details?.data ?? {};

  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // console.log("data", data);

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  return (
    <div className={styles.nft_container}>
      <div>
        {!fallbackImage || !error ? (
          <img className={styles.nft_image}src={image} alt={name} />
        ) : (
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </div>

      <div className={styles.nft_details}>
        <div className={styles.nft_text}>
          <div className={styles.nft_title}>{name}</div>
        </div>
      </div>
    </div>
  );
};
